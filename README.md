<h1>
  Quantum Tab
  <img src="./public/icon.png" alt="Quantum Tab Logo" width="50" height="50" align="right">
</h1>

![License: AGPL](https://img.shields.io/badge/License-AGPL-blue)
![Made with TypeScript](https://img.shields.io/badge/Made_with-TypeScript-blue)
![Framework: Preact](https://img.shields.io/badge/Framework-Preact-blueviolet)
![Styled with Tailwind CSS](https://img.shields.io/badge/Styled_with-Tailwind_CSS-brightgreen)

## **Overview:**

Quantum Tab is a sleek and customizable new tab extension designed to enhance your browsing experience. With its minimalist design and powerful customization options, Quantum Tab allows you to transform your new tab page into a productivity hub tailored to your needs.

## **Features:**

- **Minimalistic Design:** Enjoy a clutter-free browsing experience with Quantum Tab's minimalist interface.
- **Custom Backgrounds:** Personalize your new tab page with custom backgrounds or choose from a curated selection.
- **Quick Links:** Access your favorite websites with ease by adding quick links directly on the new tab page.
- **Search Bar:** Perform quick searches directly from the new tab page using the integrated search bar using the search engine of your choice.
- **Widgets:** Add widgets such as weather, forecasts, to-do lists and more to stay organized and productive.
- **RSS Feed:** Stay updated with your favorite news sources or blogs by integrating an RSS feed directly into Quantum Tab.

## **Installation:**

1. **Clone the repository:**

```bash
git clone https://github.com/professor-2390/quantum-tab
```

2. **Install dependencies:**

```bash
cd quantumtab
yarn install
```

## **Development:**

To run the extension locally during development:

```bash
yarn dev
```

## **Building for Production:**

To build the extension for production:

```bash
yarn build
```

This command compiles the TypeScript code and generates the production-ready files in the `dist` directory.

## **Usage:**

- Load the extension in Chrome or any Chromium-based browser:
  - Navigate to `chrome://extensions/`
  - Enable Developer mode
  - Click on "Load unpacked" and select the dist directory of your extension
- Enjoy using Quantum Tab as your new tab page!

## **To-Do:**

- [ ] Basic Functionalities:
  - [x] Toggleable widgets
  - [x] Make expandable widget props easily customizable
  - [x] Improve the styling of the widgets
  - [x] Add random background image for every new tab
  - [x] Add option for Quote of the Day to toggle new quote every new tab
  - [x] Widget based config
- [x] Clock Widget:
  - [x] Add option to toggle between 24-hour and 12-hour mode
- [ ] Date Widget:
  - [ ] Add the option to toggle between different date formats: MM/DD/YYYY, DD/MM/YYYY, and YYYY/MM/DD
  - [ ] Provide an option to switch between different date views, including displaying full dates or in the format of dd/mm/yyyy.
- [ ] Quick Links:
  - [ ] Implement functionality to add quick links
  - [ ] Allow users to customize and manage quick links
- [ ] Recently Visited Sites:
  - [ ] Implement functionality to add recently visited sites widget
- [ ] Quick Search:
  - [ ] Allow users to pick their preferred search engine
- [ ] QOTD:
  - [ ] Make it so the QOTD updates every mid-night
  - [ ] Implement functionality to make it update every new tab
- [ ] RSS Feed:
  - [ ] Implement RSS feed integration
  - [ ] Allow users to add and manage RSS feeds
  - [ ] Display latest updates from subscribed feeds on the new tab page
- [ ] Optimize code for improved performance
  - [x] Refactor ClockWidget to use functional components where appropriate
  - [x] Reduce unnecessary re-renders by optimizing state updates

## **Contributing:**

Contributions to Quantum Tab are welcome! If you have ideas for new features, improvements, or bug fixes, feel free to submit a pull request. Please refer to the contribution guidelines in the repository for more information.

### **How to Contribute:**

1. **Fork the Repository:** Start by forking the repository on GitHub to your own account.
2. **Clone the Repository:** Clone the forked repository to your local machine using the following command:
   ```bash
   git clone https://github.com/your-username/quantum-tab.git
   ```
3. **Create a Branch:** Create a new branch for your contribution:
   ```bash
   git checkout -b feature/new-feature
   ```
4. **Make Changes:** Make your desired changes in the codebase.
5. **Commit Changes:** Commit your changes with a descriptive commit message:
   ```bash
   git commit -am 'Add new feature'
   ```
6. **Push Changes:** Push your changes to your forked repository:
   ```bash
   git push origin feature/new-feature
   ```
7. **Submit a Pull Request:** Go to the GitHub page of your forked repository and submit a pull request to the main repository. Please provide a clear description of your changes and any related issues.

### **Contribution Guidelines:**

- Follow the existing code style and conventions.
- Ensure that your changes are properly tested.
- Keep pull requests focused and concise, addressing one issue or feature at a time.
- Be respectful to others and open to feedback.

Thank you for contributing to Quantum Tab!

## **License:**

Quantum Tab is licensed under the [GNU Affero General Public License v3.0 (AGPL-3.0)](https://opensource.org/licenses/AGPL-3.0). See the [LICENSE](./LICENSE) file for details.
