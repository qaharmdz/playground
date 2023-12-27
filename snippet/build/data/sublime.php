<?php

return [
    'group'  => 'Sublime',
    'data' => [
        /*
        [
            ['tag'],
            'content'
        ],
        */

        [
            ['search', 'regex'],
            '
Search multiple `$this->request` or `$this->response`.

```javascript
\$this->request|\$this->response|\$this->request->server
\$this->request->get\[|\$this->request->post|\$this->request->server
```
'
        ]
    ]
];
