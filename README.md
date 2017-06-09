Vue.js_Intrduction
===
## 什么是Vue.js?
Vue.js（读音 /vjuː/，类似于 view） 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和 Vue 生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。
***
## Vue.js框架的引用
最简单的方法是直接调用下面网址的js代码。  

```<script src="https://unpkg.com/vue/dist/vue.js"></script>```  
也可以直接下载下来到本地，可离线使用。  
将这段代码放到html文件中，我们就可以使用关于Vue.js框架了。
## 用Vue.js写第一个Hello World程序
### 声明式渲染
Vue.js 的核心是一个允许采用简洁的模板语法来声明式的将数据渲染进 DOM  
html文件  
```
<!DOCTYPE html>
<html>
<script src="https://unpkg.com/vue/dist/vue.js"></script>

<body>

  <div id="app">
    {{ message }}
  </div>
</body>

<script src="1.js"></script>

</html>
```
js文件
``` 
var app = new Vue({
   el: '#app',
   data: {
    message: 'Hello World!'
   }
 }) 
 ```
  ![image](https://github.com/JohnChin/Vue_Intrduction/blob/quote/quote/result.png)  

Vue 在背后做了大量工作,现在数据和 DOM 已经被绑定在一起，所有的元素都是响应式的。打开你的浏览器的控制台（就在这个页面打开），并修改 app.message，你将看到上例相应的更新。
### MVVM 数据绑定
MVVM的本质是通过数据绑定链接*View*和*Model*，让数据的变化自动映射为视图的更新。Vue.js在数据绑定的API设计上借鉴了*Angular*的指令机制：用户可以通过具有特殊前缀的HTML 属性来实现数据绑定，也可以使用常见的花括号模板插值，或是在表单元素上使用双向绑定。  
插值本质上也是指令，只是为了方便模板的书写。在模板的编译过程中，Vue.js会为每一处需要动态更新的DOM节点创建一个指令对象。每当一个指令对象观测的数据变化时，它便会对所绑定的目标节点执行相应的DOM操作。基于指令的数据绑定使得具体的DOM操作都被合理地封装在指令定义中，业务代码只需要涉及模板和对数据状态的操作即可，这使得应用的开发效率和可维护性都大大提升。  
![imgage](http://img.ptcms.csdn.net/article/201508/11/55c9abacf113a.jpg)
## 处理用户输入
为了让用户和你的应用进行互动，我们可以用 v-on 指令绑定一个事件监听器，通过它调用我们 Vue 实例中定义的方法：  
```
<!DOCTYPE html>
<html>
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<body>

  <div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">逆转消息</button>
</div>
</body>

<script src="2.js"></script>

</html>
```
```
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```
注意在 reverseMessage 方法中，我们更新了应用的状态，但没有触碰 DOM——所有的 DOM 操作都由 Vue 来处理，你编写的代码只需要关注底层逻辑。  
Vue 还提供了 v-model 指令，它能轻松实现表单输入和应用状态之间的双向绑定。
```
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```
```
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
```
 ![image](https://github.com/JohnChin/Vue_Intrduction/blob/quote/Input/input1.png)  
## Vue.js的常用指令
上面用到的v-model是Vue.js常用的一个指令，那么指令是什么呢？

Vue.js的指令是以v-开头的，它们作用于HTML元素，指令提供了一些特殊的特性，将指令绑定在元素上时，指令会为绑定的目标元素添加一些特殊的行为，我们可以将指令看作特殊的HTML特性（attribute）。
Vue.js提供了一些常用的内置指令，接下来我们将介绍以下几个内置指令：
* v-if指令  
v-if是条件渲染指令，它根据表达式的真假来删除和插入元素，它的基本语法如下：
v-if="expression"
expression是一个返回bool值的表达式，表达式可以是一个bool属性，也可以是一个返回bool的运算式。
* v-show指令  
v-show也是条件渲染指令，和v-if指令不同的是，使用v-show指令的元素始终会被渲染到HTML，它只是简单地为元素设置CSS的style属性。
* v-else指令  
可以用v-else指令为v-if或v-show添加一个“else块”。v-else元素必须立即跟在v-if或v-show元素的后面——否则它不能被识别。
* v-for指令  
v-for指令基于一个数组渲染一个列表，它和JavaScript的遍历语法相似：
v-for="item in items"
items是一个数组，item是当前被遍历的数组元素。
* v-bind指令  
v-bind指令可以在其名称后面带一个参数，中间放一个冒号隔开，这个参数通常是HTML元素的特性（attribute），例如：v-bind:class
v-bind:argument="expression"
下面这段代码构建了一个简单的分页条，v-bind指令作用于元素的class特性上。
这个指令包含一个表达式，表达式的含义是：高亮当前页。
* v-on指令    
v-on指令用于给监听DOM事件，它的用语法和v-bind是类似的，例如监听<a>元素的点击事件：
<a v-on:click="doSomething">
有两种形式调用方法：绑定一个方法（让事件指向方法的引用），或者使用内联语句。
Greet按钮将它的单击事件直接绑定到greet()方法，而Hi按钮则是调用say()方法。  
Vue.js具有良好的扩展性，我们也可以开发一些自定义的指令。  

### 组件系统
在Vue.js的设计中将组件作为一个核心概念。可以说，每一个Vue.js应用都是围绕着组件来开发的。 
组件系统是 Vue 的一个重要概念，因为它是一种抽象，允许我们使用小型、自包含和通常可复用的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树: 

![image](https://cn.vuejs.org/images/components.png)
在 Vue 里，一个组件本质上是一个拥有预定义选项的一个 Vue 实例，在 Vue 中注册组件很简单:  

```
Vue.component('todo-item', {
  template: '<li>这是个待办项</li>'
})
```

```
<ol>
  <!-- 创建一个 todo-item 组件的实例 -->
  <todo-item></todo-item>
</ol>
```
但是这样会为每个待办项渲染同样的文本，这看起来并不炫酷，我们应该能将数据从父作用域传到子组件。让我们来修改一下组件的定义，使之能够接受一个属性：  
```
Vue.component('todo-item', {
  // todo-item 组件现在接受一个
  // "prop"，类似于一个自定义属性
  // 这个属性名为 todo。
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
```
现在，我们可以使用 v-bind 指令将待办项传到每一个重复的组件中：  
```
<div id="app-7">
  <ol>
    <!-- 现在我们为每个todo-item提供待办项对象    -->
    <!-- 待办项对象是变量，即其内容可以是动态的 -->
    <todo-item v-for="item in groceryList" v-bind:todo="item"></todo-item>
  </ol>
</div>
```
```
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { text: '蔬菜' },
      { text: '奶酪' },
      { text: '随便其他什么人吃的东西' }
    ]
  }
})
```
## 一个简单的DEMO
接下来，用Vue.js的一些知识，来实现一个简单的签到系统。
```
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="demo.css" />
</head>

<body>
    <div id="app">

        <fieldset>
            <legend>
                签到系统
            </legend>
            <div class="form-group">
                <label>Name:</label>
                <input type="text" v-model="newPerson.name" />
            </div>
            <div class="form-group">
                <label>Num:</label>
                <input type="text" v-model="newPerson.num" />
            </div>
            <div class="form-group">
                <label>Sex:</label>
                <select v-model="newPerson.sex">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div class="form-group">
                <label></label>
                <button @click="createPerson">Create</button>
            </div>
        </fieldset>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Num</th>
                    <th>Sex</th>
                    <th>Delete</th>
                    <th>Sign</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="person in people">
                    <td>{{ person.name }}</td>
                    <td>{{ person.num }}</td>
                    <td>{{ person.sex }}</td>
                    <td :class="'text-center'"><button @click="deletePerson($index)">Delete</button></td>
                    <td :class="'text-center'" ><button onclick="this.style.color='red';" @click="sign()">Sign</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
<script src="vue.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            newPerson: {
                name: '',
                num: 0,
                sex: 'Male'
            },
            people: [{
                name: 'Jack',
                num: 31401367,
                sex: 'Male'
            }, {
                name: 'Bill',
                num: 31509150,
                sex: 'Male'
            }, {
                name: 'Tracy',
                num: 31606370,
                sex: 'Female'
            }, {
                name: 'Chris',
                num: 31405238,
                sex: 'Male'
            }]
        },
        methods: {
            createPerson: function () {
                this.people.push(this.newPerson);
                // 添加完newPerson对象后，重置newPerson对象
                this.newPerson = { name: '', num: 0, sex: 'Male' }
            },
            deletePerson: function (index) {
                // 删一个数组元素
                this.people.splice(index, 1);
            },
            sign: function(){          
                alert("签到成功！");
            }
        }
    })
</script>

</html>
```
实现效果： 

![image](https://github.com/JohnChin/Vue_Intrduction/blob/quote/signsys/sign.png)
