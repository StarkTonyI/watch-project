export default function Footer() {
    return (
    <footer className="bg-transparent text-gray-300 py-6 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p>© {new Date().getFullYear()} MyBrand. Все права защищены.</p>
        </div>
    </footer>
);
}