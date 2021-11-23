<?php

return [
    'group'  => 'jQuery',
    'data' => [
        /*
        [
            ['tag'],
            'content'
        ],
        */

       [
            ['event'],
            '
Emit custom event
```javascript
// Emit
$(document).trigger(\'plugin.action\', [{foo:true}, param1, param2]);

// Listener
$(document).on(\'plugin.action\', function(event, data, param1, param2) {
  console.log(data.foo);
});

// Listener
$(document).on(\'plugin.action\', callback);
var callback = function(event, data, param1, param2) {
  console.log(data.foo);
}
```
'
        ],
    ]
];
