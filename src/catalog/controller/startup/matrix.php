<?php
namespace Opencart\Catalog\Controller\Extension\Matrix\Startup;

use \Opencart\System\Engine;
use \Opencart\System\Library;

class Matrix extends Engine\Controller
{
	public function index(): void
	{
		if ($this->config->get('config_theme') == 'matrix' && $this->config->get('theme_matrix_status')) {
			$this->load->config('extension/matrix/theme');

			$this->startup();
			$this->init();
		}
	}

	/**
	 * Inner codes might be changed, but the library usage must be the same.
	 * No changes on how to use it on controller, just different in inner work and add extra method.
	 */
	protected function startup()
	{
		/**
		 * Changed to use template inheritance
		 */
		$this->registry->set('template', new Library\Extension\Matrix\Template([
			'debug'    => (bool)$this->config->get('theme_matrix_debug'),
			'timezone' => 'UTC',
		]));

		/**
		 * Added methods: addMeta, getMetas, addNode, setNode, getNode
		 */
		$this->registry->set('document', new Library\Extension\Matrix\Document());
	}

	protected function init()
	{
		// Documents
        $this->document->setNode('url_base', $this->config->get('config_url'));

		$route = $this->request->get['route'] ?? 'common-home';
        $this->document->addNode('class_body', [str_replace(['/', '\\', '_'], '-', 'r-' . $route)]);

        // Twig global variables, accessible under namespace "matrix"
		$this->template->setGlobal('document', $this->document);
		$this->template->setGlobal('language', $this->language);

        // Adjustment
		$this->event->register('view/*/before', new \Opencart\System\Engine\Action('extension/matrix/startup/matrix.beforeAllView'));

	}

	public function beforeAllView(string &$route, array &$args, mixed &$output): void
	{
		// Use document node for breadcrumbs
		$this->document->addNode('breadcrumbs', $args['breadcrumbs'] ?? []);
	}
}
