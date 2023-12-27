<?php
namespace Opencart\System\Library\Extension\Matrix;

use \Opencart\System\Library;

class Document Extends Library\Document
{
	protected array $metas = [];
	protected mixed $nodes;

	/**
	 * <meta $attribute="$value" content="$content">
	 * <meta name="description" content="...">
	 */
	public function addMeta(string $attribute, string $value, string $content): void
	{
		$this->metas[$attribute . '-' . $value] = [
			'attribute' => $attribute,
			'value'     => $value,
			'content'   => $content
		];
	}

	public function getMetas(): array
	{
		return $this->metas;
	}

	/**
	 * General purpose nodes
	 */
	public function addNode(string $name, $value): void
	{
		$type = is_array($value) ? [] : '';
		$node = $this->nodes[$name] ?? $type;

		if (is_array($node)) {
			$this->setNode($name, array_unique(array_merge($node, (array)$value), SORT_REGULAR));
		} else {
			$this->setNode($name, $value);
		}
	}

	public function setNode(string $name, $value): void
	{
		$this->nodes[$name] = $value;
	}

	public function getNode(string $name, $default = null): mixed
	{
		return $this->nodes[$name] ?? $default;
	}
}
