"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const AnimatedAdjectives = ({ adjectives }: { adjectives: string[] }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % adjectives.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [adjectives.length]);

    return (
        <span className="inline-block text-center w-48">
            <AnimatePresence mode="wait">
                <motion.span
                    key={adjectives[index]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                >
                    {adjectives[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};