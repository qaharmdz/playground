<?php
namespace Opencart\Admin\Controller\Extension\Matrix\Theme;

use \Opencart\System\Engine;

class Matrix extends Engine\Controller
{
	public function __construct(Engine\Registry $registry)
	{
		parent::__construct($registry);

		$this->load->config('extension/matrix/theme');
	}

	public function index(): void 
	{
		$this->load->language('extension/matrix/theme/matrix');

		$this->document->setTitle($this->language->get('heading_title'));

		$store_id = 0;
		if (isset($this->request->get['store_id'])) {
			$store_id = (int)$this->request->get['store_id'];
		}

		$data['breadcrumbs'] = [];
		$data['breadcrumbs'][] = [
			'text' => $this->language->get('text_home'),
			'href' => $this->url->link('common/dashboard', 'user_token=' . $this->session->data['user_token'])
		];
		$data['breadcrumbs'][] = [
			'text' => $this->language->get('text_extension'),
			'href' => $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=theme')
		];
		$data['breadcrumbs'][] = [
			'text' => $this->language->get('heading_title'),
			'href' => $this->url->link('extension/matrix/theme/matrix', 'user_token=' . $this->session->data['user_token'] . '&store_id=' . $store_id)
		];

		$data['page_title'] = $this->language->get('heading_title') . ' v' . $this->config->get('matrix')['version'];
		$data['url_save']   = $this->url->link('extension/matrix/theme/matrix.save', 'user_token=' . $this->session->data['user_token'] . '&store_id=' . $store_id);
		$data['url_back']   = $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=theme');

		$this->load->model('setting/setting');

		$data['setting']  = array_merge(
			$this->config->get('matrix')['setting'],
			$this->model_setting_setting->getSetting('theme_matrix', $store_id),
		);

		$data['header']      = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer']      = $this->load->controller('common/footer');

		$this->response->setOutput($this->load->view('extension/matrix/theme/matrix', $data));
	}

	public function save(): void 
	{
		$this->load->language('extension/matrix/theme/matrix');

		$store_id = 0;
		if (isset($this->request->get['store_id'])) {
			$store_id = (int)$this->request->get['store_id'];
		}

		$json = [];

		if (!$this->user->hasPermission('modify', 'extension/matrix/theme/matrix')) {
			$json['error'] = $this->language->get('error_permission');
		}

		if (!$json) {
			$this->load->model('setting/setting');

			$this->model_setting_setting->editSetting('theme_matrix', $this->request->post, $store_id);

			$json['success'] = $this->language->get('text_success');
		}

		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($json));
	}

	public function install(): void {
		if ($this->user->hasPermission('modify', 'extension/theme')) {
			$this->load->model('setting/startup');

			$this->model_setting_startup->addStartup([
				'code'        => 'theme_matrix',
				'description' => 'Matrix theme catalog startup',
				'action'      => 'catalog/extension/matrix/startup/matrix',
				'status'      => 1,
				'sort_order'  => 0,
			]);
		}
	}

	public function uninstall(): void {
		if ($this->user->hasPermission('modify', 'extension/theme')) {
			$this->load->model('setting/startup');

			$this->model_setting_startup->deleteStartupByCode('theme_matrix');
		}
	}
}
