// STATELESS FUNCTIONAL FORBIDDEN COMPONENT:
const Forbidden = () => {
    return (
        <main>
            <div className="wrap">
                <h2>Forbidden</h2>
                <p>Oh oh! You can't access this page.</p>
            </div>
        </main>
    );
};

// EXPORT FORBIDDEN COMPONENT:
export default Forbidden;
