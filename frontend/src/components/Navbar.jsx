import React from "react";
import { House } from 'lucide-react';
import Container from './Container';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return(
        <div>
        <Container size="small">
            <Link to="/">
            <House size={32} color="#040B3B" />
            </Link>
        </Container>
        </div>
    );
}   