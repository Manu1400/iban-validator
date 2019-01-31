const execPhp = require('exec-php')

console.log("require ok")

// on Mac OS X
execPhp('helloWorld.php', '/usr/bin/php', function(error, php, output){
  console.log(error)
  console.log(php)
  console.log(output)
    // php now contain user defined php functions.
    //php.my_own_php_function(arg1, arg2, function(error, result, output, printed){
        // `result` is return value of `my_own_php_function` php function.

    //});
});
