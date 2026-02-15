import { useState } from 'react';

interface WebhookRequest {
    id: string;
    timestamp: string;
    method: string;
    headers: Record<string, string>;
    body: string;
}

export const useWebhookTester = () => {
    const [webhookUrl, setWebhookUrl] = useState('');
    const [requests, setRequests] = useState<WebhookRequest[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<WebhookRequest | null>(null);

    // In a real implementation, this would set up a server endpoint
    // For now, we'll simulate with a unique URL
    const generateWebhookUrl = () => {
        const id = Math.random().toString(36).substring(7);
        setWebhookUrl(`https://webhook.devhub.com/${id}`);
    };

    const clearRequests = () => {
        setRequests([]);
        setSelectedRequest(null);
    };

    // Simulate receiving a webhook (in real app, this would be from server)
    const simulateWebhook = () => {
        const newRequest: WebhookRequest = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'GitHub-Hookshot/abc123'
            },
            body: JSON.stringify({
                event: 'push',
                repository: 'user/repo',
                commits: 3
            }, null, 2)
        };
        setRequests([newRequest, ...requests]);
    };

    return {
        webhookUrl,
        requests,
        selectedRequest,
        setSelectedRequest,
        generateWebhookUrl,
        clearRequests,
        simulateWebhook
    };
};
