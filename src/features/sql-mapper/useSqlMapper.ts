import { useState } from 'react';

interface SqlMapperResult {
    tsInterface: string;
    reactHook: string;
    expressController: string;
}

export const useSqlMapper = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mapSqlTypeToTs = (sqlType: string): string => {
        const type = sqlType.toUpperCase();
        if (type.includes('INT') || type.includes('SERIAL') || type.includes('DECIMAL') || type.includes('NUMERIC')) return 'number';
        if (type.includes('CHAR') || type.includes('TEXT')) return 'string';
        if (type.includes('BOOL')) return 'boolean';
        if (type.includes('TIMESTAMP') || type.includes('DATE')) return 'Date';
        return 'any';
    };

    const generateCode = async (sqlInput: string): Promise<string | null> => {
        if (!sqlInput.trim()) return null;
        setLoading(true);
        setError(null);

        return new Promise((resolve) => {
            setTimeout(() => {
                try {
                    const tableNameMatch = sqlInput.match(/CREATE TABLE\s+(\w+)/i);
                    const tableName = tableNameMatch ? tableNameMatch[1] : 'Unknown';

                    // Extract columns
                    const columns: string[] = [];
                    const lines = sqlInput.split('\n');

                    lines.forEach(line => {
                        const trimmedLine = line.trim();
                        // Skip comments and empty lines
                        if (!trimmedLine || trimmedLine.startsWith('--')) return;

                        const match = trimmedLine.match(/^(\w+)\s+(\w+)/);
                        if (match && !trimmedLine.toUpperCase().includes('PRIMARY KEY') && !trimmedLine.toUpperCase().includes('CREATE TABLE')) {
                            columns.push(`${match[1]}: ${mapSqlTypeToTs(match[2])};`);
                        }
                        // Handle inline definition like "id SERIAL PRIMARY KEY"
                        if (trimmedLine.toUpperCase().includes('SERIAL') || (trimmedLine.toUpperCase().includes('INT') && trimmedLine.toUpperCase().includes('PRIMARY KEY'))) {
                            const idMatch = trimmedLine.match(/^(\w+)/);
                            if (idMatch) columns.push(`${idMatch[1]}: number;`);
                        }
                    });

                    const interfaceName = tableName.charAt(0).toUpperCase() + tableName.slice(1).replace(/s$/, ''); // singularize roughly

                    const tsCode = `
// Types
interface ${interfaceName} {
  ${columns.join('\n  ')}
}

// React Hook
export const use${interfaceName} = () => {
  const [data, setData] = React.useState<${interfaceName}[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetch${interfaceName}s = async () => {
    setLoading(true);
    const res = await fetch('/api/${tableName}');
    setData(await res.json());
    setLoading(false);
  };

  return { data, loading, refetch: fetch${interfaceName}s };
};

// Express Controller
export const get${interfaceName}s = async (req: Request, res: Response) => {
  try {
    const result = await db.query('SELECT * FROM ${tableName}');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
`;
                    resolve(tsCode.trim());
                } catch (err) {
                    setError('Error parsing SQL. Please use standard CREATE TABLE syntax.');
                    resolve('// Error parsing SQL. Please use standard CREATE TABLE syntax.');
                } finally {
                    setLoading(false);
                }
            }, 800);
        });
    };

    return { generateCode, loading, error };
};
