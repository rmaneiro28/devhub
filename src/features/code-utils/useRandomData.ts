import { useState } from 'react';
import { faker } from '@faker-js/faker';

export type DataType = 'name' | 'email' | 'phone' | 'address' | 'company' | 'lorem' | 'uuid' | 'number';

export const useRandomData = () => {
    const [dataType, setDataType] = useState<DataType>('name');
    const [count, setCount] = useState(5);
    const [results, setResults] = useState<string[]>([]);

    const generate = () => {
        const data: string[] = [];

        for (let i = 0; i < count; i++) {
            switch (dataType) {
                case 'name':
                    data.push(faker.person.fullName());
                    break;
                case 'email':
                    data.push(faker.internet.email());
                    break;
                case 'phone':
                    data.push(faker.phone.number());
                    break;
                case 'address':
                    data.push(faker.location.streetAddress(true));
                    break;
                case 'company':
                    data.push(faker.company.name());
                    break;
                case 'lorem':
                    data.push(faker.lorem.sentence());
                    break;
                case 'uuid':
                    data.push(faker.string.uuid());
                    break;
                case 'number':
                    data.push(faker.number.int({ min: 1, max: 10000 }).toString());
                    break;
            }
        }

        setResults(data);
    };

    const copyAll = () => {
        navigator.clipboard.writeText(results.join('\n'));
    };

    return {
        dataType,
        setDataType,
        count,
        setCount,
        results,
        generate,
        copyAll
    };
};
