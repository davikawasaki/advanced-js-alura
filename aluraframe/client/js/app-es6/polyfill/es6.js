// Polyfill: script that emulates a resource behavior when it's not supported,
// enabling the code to work without abdicating new resources that aren't supported yet.
// @see: https://remysharp.com/2010/10/08/what-is-a-polyfill

if(!Array.prototype.includes) {
    console.log('Polyfill for Array.includes applied.');
    Array.prototype.includes = function(el) {
        return this.indexOf(el) != -1;
    };
}