import { useState } from 'react';

export const useSqlQueryBuilder = () => {
    const [table, setTable] = useState('users');
    const [operation, setOperation] = useState<'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE'>('SELECT');
    const [columns, setColumns] = useState<string[]>(['*']);
    const [whereClause, setWhereClause] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const [limit, setLimit] = useState('');

    const generateQuery = (): string => {
        let query = '';

        switch (operation) {
            case 'SELECT':
                query = `SELECT ${columns.join(', ')}\nFROM ${table}`;
                if (whereClause) query += `\nWHERE ${whereClause}`;
                if (orderBy) query += `\nORDER BY ${orderBy}`;
                if (limit) query += `\nLIMIT ${limit}`;
                break;

            case 'INSERT':
                query = `INSERT INTO ${table} (${columns.filter(c => c !== '*').join(', ')})\nVALUES (${columns.filter(c => c !== '*').map(() => '?').join(', ')})`;
                break;

            case 'UPDATE':
                const setClauses = columns.filter(c => c !== '*').map(c => `${c} = ?`).join(', ');
                query = `UPDATE ${table}\nSET ${setClauses}`;
                if (whereClause) query += `\nWHERE ${whereClause}`;
                break;

            case 'DELETE':
                query = `DELETE FROM ${table}`;
                if (whereClause) query += `\nWHERE ${whereClause}`;
                break;
        }

        return query + ';';
    };

    return {
        table,
        setTable,
        operation,
        setOperation,
        columns,
        setColumns,
        whereClause,
        setWhereClause,
        orderBy,
        setOrderBy,
        limit,
        setLimit,
        generateQuery
    };
};
