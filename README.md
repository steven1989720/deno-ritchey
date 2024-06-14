# deno-ritchey
Write and deploy a deno.com/deploy app that
1. Displays at the default assigned URL an HTML page containing a simple input field with submit button
2. Upon entering text in that field a generated URL (link) is displayed either below the input or on a new page following refresh (not both)
3. Upon calling the generated URL (link) at a terminal prompt with CURL, the originally entered text is printed to the console
