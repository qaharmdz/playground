
### Matrix - OpenCart 4 Theming Concept

The work is not intended to be a complete and finished theme. Only to show the advantage of Twig template inheritance.

Dev env: PHP 8.2 and OpenCart 4.0.2.3

### Key Concepts

	- Twig template inheritance: `extends` and `block`
		- HTML skeleton `<head>` and `<body>`, file `src/catalog/view/template/document.tpl.twig`
		- Page layout-ing, file `src/catalog/view/template/layout_base.tpl.twig`
		- Main page output, ex. `src/catalog/view/template/common/home.twig`
	- Twig global Variable
		- Use namespace `matrix`
	- Styling with Bootstrap CSS variables

### How to Use

- Download `matrix_theme.ocmod.zip`
- Install through OpenCart __Extensions > Installer__
- Go to __Extensions > Extensions > Themes__
	- Instal Matrix and enabled
- Go to __System > Settings > Edit Store__
	- Set theme to Matrix
- Visit the front site, not much different :D