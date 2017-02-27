## 入口

## 出口

## 加载器(loaders)
1. babel-loader


## dev Server
1. 为了加快开发，创建一个可以热加载的服务器是一个很好的手段。webpack本身提供了三种手段，作为初学者，建议使用webpack-dev-server。关于三种方法的解决方案的配置和不同，官方手册给出了这一部分[内容](https://webpack.js.org/guides/development/)
2. 要使用webpack-dev-server,配置方法如下:
    1. npm install webpack-dev-server --save-dev
    2. 在package.json中加入script，之后就可以使用npm start执行了(因为没有全局安装，所以命令行不能直接使用)：
       大概像我发给你的里面那样配置，主要是"start": "webpack-dev-server --open"
    3. 此时，需要在webpack.config.js中加入对服务器的配置。参数很多，这里介绍常用的。

    ```js
    devtool: "cheap-eval-source-map",//这个的配置是为了在出错的时候，方便调试，因为我们的代码都被bundle到了一个js中，通过开启map，就可以定位到具体bundle前的代码，当然速度可能会慢一些
    devServer:{
      contentBase:path.resolve(__dirname,'./dev'),
    },
    ```
       **在写webpack.config.js的时候要注意层级关系，调试代码的时候其实要看出错在哪一行，一步一步找(会有一些文件不认识，那是node默认的一些底层，咱们写的代码其实调用了底层，所以要定位到咱们的代码哪一行引起了错误)**
    4. devServer中定义的contentBase目录下，应该存放一个index.html,它会默认去那个默认目录下使用Index.html作为咱们的页面。当然，页面中要引入<script src="/bundle.js"></script>,注意'/bundle.js'中的'/'和文件名要改成自己的。
3. 使用npm start 就会出现一个热更新的服务器了。
