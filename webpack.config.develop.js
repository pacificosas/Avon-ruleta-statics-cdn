var wp=require("./webpack.config")
var path=require("path");

wp.output={
    path: path.resolve(__dirname, 'dist','js'),
    filename: "index-test.js" 
}
wp.entry= {
    test:"./typescript/testMain.ts"
}
wp.watch= true
wp.mode= "development",
wp.devtool= "inline-source-map",

module.exports=wp