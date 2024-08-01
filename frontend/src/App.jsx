import LoginFormPage from "./components/LoginFormPage";
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider>
      <LoginFormPage />
    </ThemeProvider>
)
}

export default App;
