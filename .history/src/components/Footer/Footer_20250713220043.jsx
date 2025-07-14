// Footer.jsx
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-8">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-lg font-semibold mb-2">🐾 Pawfect Forum</h2>
                <p className="text-sm text-gray-300">Connect, Share & Discover your Pet Passion!</p>
                <p className="text-xs mt-2 text-gray-400">&copy; {new Date().getFullYear()} Pawfect. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
