---
title: React Hooks?
date: "2018-11-15T09:32:32.169Z"
template: "post"
draft: false
slug: "/2018/11/react-hooks/"
category: "Javascript"
tags:
  - "React"
  - "Hook"
description: "Một tính năng mới vừa được đề nghị cho phép bạn sử dụng state và các tính năng khác của React mà không cần phải viết class."
---

_React Hooks_ là một tính năng mới vừa được đề nghị cho phép bạn sử dụng state và các tính năng khác của React mà không cần phải viết class (functional component). Hiện _React Hooks_ vẫn còn đang trong quá trình thảo luận và đã có sẵn trong bản _v16.7.0-alpha_ (Xem qua [RFC](https://github.com/reactjs/rfcs/pull/68)). Hãy cùng xem React Hooks sẽ giải quyết vấn đề như thế nào nhé!

## State Hook 🔥

Chúng ta cùng xem ví dụ trên trang tài liệu trực tiếp của React nhé:

```js
import { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

Theo như mô tả, ta có `useState` là một _Hook_, chúng ta sẽ gọi nó ngay bên trong hàm component nó sẽ trả về hai thứ: một là giá trị của state hiện tại và hai là hàm đễ cập nhật giá trị state đó. Có thể gọi hàm cập nhật đấy ở bất cứ đâu trong component, nó tương thự như `this.setState` trong class.

Trong `useState` ta chỉ có một giá trị tham số duy nhất đó là giá trị mặc định của state đấy. Trong ví dụ bên trên nó mang giá trị tham số bằng `0`. Khác với `this.state` mang kiểu dữ liệu là một `object` thì state này có thể là bất cứ kiểu dữ liệu nào mà bạn muốn. Đây là một ví dụ để dùng nhiều hơn là một state trong một component:

```js
// Declare multiple state variables!
const [age, setAge] = useState(42);
const [fruit, setFruit] = useState('banana');
const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```

Bạn có thể tham khảo thêm [sử dụng State Hook](https://reactjs.org/docs/hooks-state.html).

## Effect Hook 🚀

Tiếp theo, `useEffect` là một cái _Hook_ khác mà mình muốn đề cập. Nó cho phép thực hiện các tác động vào bên trong component, để dễ hiểu nó sẽ thay thế cho các lifecycle `componentDidMount`, `componentDidUpdate` và `componentWillUnmount` trong React Class nhưng điều thú vị nó chỉ có một hàm api duy nhất.

Với ví dụ này mình lấy từ trang chủ của React, component này sẽ thay đổi tiêu đề sau khi React cập nhật các DOM:

```js
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

Khi bạn gọi thằng `useEffect`, bạn đang cho React biết rằng "à tao cần tác động những điều này nếu mày thay đổi DOM". Effect được khai báo ngay bên trong component và có quyền truy cập được các state và props. Mặc định, effect sẽ được gọi sau mỗi lần render DOM bao gồm cả lần đầu tiên. Để hiểu rõ hơn về Effect Hook bạn hãy tham khảo thêm [sử dụng Effect Hook](https://reactjs.org/docs/hooks-effect.html).

Ngoài ra còn vài cái Hooks khác như `useContext`, `useReducer`, `useCallback`, `useMemo`, `useRef`... bạn có thể tìm chúng ở trang chủ của ReactJS.

## Rules of Hooks 👌

Những điều lưu ý khi làm việc với Hooks là:

*   Phải gọi ở trên cùng của component, không được nằm trong vòng lặp, khu vực điều kiện, hay các function con
*   Dĩ nhiên rồi, nó chỉ sử dụng trong funcational component

## Conclusion

Mình nghĩ khả năng cao là _React Hooks_ sẽ có mặt chính thức trong phiên bản kế tiếp của React dù chưa chính thức nhưng riêng bản thân mình khá thích thú với nó vì khả năng của nó trong việc xây dựng các functional component. Để xem thêm về _React Hooks_ bạn có thể xem trực tiếp [tại trang chủ của ReacJS](https://reactjs.org/docs/hooks-intro.html) nhé.
