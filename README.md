# service-worker-experiments

Very first version. Registers and installs a SW, that SW just puts "still alive" in its console ever 3rd second. Close the tab of the page and see that it continues to do so to verify that it remains alive even when "parent" page is gone.

I serve from the comman line using "python -m SimpleHTTPServer 8899" and open "locahost:8899/index.html" in the browser. Use "chrome:/serviceworker-internals" to get to the SW console.