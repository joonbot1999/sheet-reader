'use client'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'

export default function NavbarComponent() {
    return (
            <Nav fill variant="pills" defaultActiveKey="/" className="bg-blue-300">
                <Nav.Item>
                    <Link href="/">Main</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link href="/post">Post</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link href="/delete">Delete</Link>
                </Nav.Item>
            </Nav>
    )
}