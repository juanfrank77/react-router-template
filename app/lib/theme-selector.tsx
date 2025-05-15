export function ThemeSelector() {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const theme = e.target.value
    document.documentElement.setAttribute('data-theme', theme)
  }

  return (
    <div className="relative z-5">
      <select onChange={handleChange}>
        <option value="">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  )
}
