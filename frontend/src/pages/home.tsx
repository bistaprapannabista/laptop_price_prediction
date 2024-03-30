const HomePage = () => {
    return (
        <div className="home-page-description max-w-3xl mx-auto p-4 mt-20">
            <h1 className="text-3xl font-bold mb-4">Welcome to Laptop Price Prediction</h1>
            <p className="text-lg mb-6">Are you in the market for a new laptop but feeling overwhelmed by the myriad of options and price ranges? Look no further! Our Laptop Price Prediction platform utilizes state-of-the-art machine learning algorithms to provide accurate price estimates tailored to your specific needs and preferences.</p>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">How It Works:</h2>
                <ol className="list-decimal pl-6">
                    <li><strong>Input Your Preferences:</strong> Simply enter the specifications you're looking for in your ideal laptop, including processor type, RAM capacity, storage size, screen size, and any other desired features.</li>
                    <li><strong>Get Instant Price Predictions:</strong> Our advanced algorithms analyze vast datasets of laptop specifications and historical prices to generate precise predictions for laptops matching your criteria.</li>
                    <li><strong>Make Informed Decisions:</strong> Armed with our price predictions, you can confidently navigate the laptop market, ensuring you get the best value for your budget without compromising on quality or features.</li>
                </ol>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Why Choose Us:</h2>
                <ul className="list-disc pl-6">
                    <li><strong>Accurate Predictions:</strong> Our models are trained on comprehensive datasets, ensuring accurate price estimates that reflect current market trends and fluctuations.</li>
                    <li><strong>Customized Recommendations:</strong> We understand that every user's needs are unique, which is why our predictions are tailored to your specific preferences and requirements.</li>
                    <li><strong>Ease of Use:</strong> Our intuitive interface makes it easy for users of all levels to input specifications and obtain accurate price predictions within seconds.</li>
                    <li><strong>Save Time and Money:</strong> By leveraging our predictive analysis, you can avoid overpaying for features you don't need or missing out on great deals that align with your requirements.</li>
                </ul>
            </div>

            <p>Don't let uncertainty hold you back from finding the perfect laptop at the right price. Start using our Laptop Price Prediction platform today and take the guesswork out of your laptop shopping experience!</p>
        </div>
    );
};

export default HomePage;
