<?php
namespace Opencart\System\Library\Extension\Matrix;

class Template
{
	protected array $config = [];
	protected array $global = [];
	protected $twig;

	public function __construct(array $configs = [])
	{
		$this->setConfig($configs);
	}

	public function setConfig(array $configs = []): void
	{
		$this->config = array_replace_recursive(
			[
				'debug'       => false,
				'timezone'    => 'UTC',
				'application' => 'catalog',
				'path_cache'  => DIR_CACHE . 'template/',
			],
			$this->config,
			$configs
		);
	}

	/**
	 * Global variable available in all templates and macros
	 *
	 * @param string $key
	 * @param mixed  $value
	 */
	public function setGlobal(string $key, $value): void
	{
		if (!isset($this->global[$key])) {
			$this->global[$key] = $value;
		}
	}

	public function getPath(): array
	{
		$path = [
			// Theme templates
			DIR_EXTENSION . 'matrix/catalog/view/template/',
			// OpenCart templates
			DIR_TEMPLATE,
			// Extensions templates
			DIR_OPENCART,
		];

		// Child theme templates
		$childTemplate = DIR_EXTENSION . 'matrix_child/';
		if (file_exists($childTemplate) && is_dir($childTemplate)) {
			array_unshift($path, $childTemplate);
		}

		return $path;
	}

	public function init(): \Twig\Environment
	{
		$loader   = new \Twig\Loader\FilesystemLoader($this->getPath());
		$twig     = new \Twig\Environment($loader, [
			'charset'          => 'UTF-8',
			'autoescape'       => false,
			'debug'            => $this->config['debug'],
			'auto_reload'      => $this->config['debug'],
			'cache'            => $this->config['debug'] ? false : $this->config['path_cache'],
		]);

		$twig->addGlobal('matrix', $this->global);
		$twig->getExtension(\Twig\Extension\CoreExtension::class)->setTimezone($this->config['timezone']);

		// https://twig.symfony.com/doc/3.x/functions/dump.html
		// <pre>{{ dump(language)|e }}</pre>
		$twig->addExtension(new \Twig\Extension\DebugExtension());

		return $twig;
	}

	public function render(string $template, array $data = [], string $code = ''): string
	{
		if (!$this->twig) {
			$this->twig = $this->init();
		}

		// No support for Admin `Design > Theme Editor` until OC support editing theme templates
		// if (!empty($code)) {
		//     return $this->twig->createTemplate($code)->render($data);
		// }

		if (str_starts_with($template, 'extension/')) {
			$parts = array_filter(explode('/', $template));
			list($ext, $extVendor, $extType, $extTemplate) = $parts;

			$template = strtr('extension/:vendor/:application/view/template/:type/:template', [
				':vendor'      => $extVendor,
				':application' => $this->config['application'],
				':type'        => $extType,
				':template'    => $extTemplate,
			]);
		}

		$output = '';
		try {
			$output = $this->twig->render($template . '.twig', $data);
		} catch (Twig_Error_Syntax $e) {
			throw new \Exception('Error: Could not load template ' . $template . '!');
		}

		return $output;
	}
}
