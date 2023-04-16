import React from 'react';
import {Container} from "@/components/Container";

const Footer = () => {
    return (
        <Container className="pt-20 pb-16 text-center lg:pt-32">
            <div className="mt-12 lg:mt-18">
                <p className="font-display text-base text-slate-900">
                    GPTErr is designed for academic research only and not to condone academic dishonesty. It demonstrates the limitations of AI detection software, and should not be used to carry out academic fraud and pass off AI-generated works as one's own.
                </p>
            </div>
        </Container>
    );
};

export default Footer;
