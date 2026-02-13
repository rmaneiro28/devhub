
import React from 'react';
import Hero from '../components/Hero';
import { useNavigate } from 'react-router-dom';
import FeatureGrid from '../components/FeatureGrid';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Hero onStartClick={() => navigate('/tools')} />
            <FeatureGrid onSelectTool={() => navigate('/tools')} />
        </>
    );
};

export default Home;