import './LoginFormPage.css';

function LoginFormPage() {
    <main>
        <section>
            <div>
                <img src="frontend/dist/assets/logo.webp" alt="logo" />
                <aside>SMART Ticketing</aside>
            </div>
            <aside>
            This is a Ticket Management System for IT Businesses that handle on Site installations and Troubleshooting
            </aside>
        </section>
        <section>
            <form>
                <label>
                    Username or Email
                    <input type="text" name="credential" />
                </label>
                <label>
                    Password
                    <input type="password" name="password" />
                </label>
                <button type="submit">Log In</button>
            </form>
        </section>
    </main>
}

export default LoginFormPage;