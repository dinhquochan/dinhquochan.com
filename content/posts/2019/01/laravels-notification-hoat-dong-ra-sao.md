---
title: Laravel's Notification hoạt động ra sao?
date: "2019-01-10"
categories: "PHP"
tags:
  - "Laravel"
---

Laravel đã đem đến hệ thống thông báo giúp cho việc gửi thông báo cho nhiều kênh trở nên dễ dàng hơn bao giờ hết.

<!--more-->

Trước tiên, hãy cùng xem qua một đối tượng mẫu thông báo của Laravel:

```php
class SampleNotification extends Notification
{
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('Đây là dòng giới thiệu thông báo.')
                    ->action('Hành Động', url('/'))
                    ->line('Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!');
    }
}
```

Ta bắt đầu xem phương thức `via()` được sử dụng để nhắc cho Laravel biết là gửi thông báo này qua những kênh nào, và đương nhiên bạn cũng có thể khai báo nhiều kênh cho chúng để dễ dàng tuỳ biến từng kênh thông báo được gửi đi.

Tất cả đều bắt đầu từ lớp `Illuminate\Notifications\ChannelManager` được implements từ hai interfaces:

*   `Illuminate\Contracts\Notifications\Dispatcher`
*   `Illuminate\Contracts\Notifications\Factory`

Bạn có thể gửi thông báo đi qua facade `Illuminate\Support\Facades\Notification` mà nó sử dụng lớp `ChannelManager`:

```php
Notification::send($users, new SampleNotification());
```

Ở đây, phương thức `send()`chấp nhận 1 đối tượng `notifiable` hoặc một mảng `notifiables`, bên trong phương thức đó Laravel đã tạo ra một instance của `Illuminate\Notifications\NotificationSender` xử lý hành động gửi thông báo đi, nó bao gồm ba công việc chính:

*   Chuẩn bị nơi chuyển thông báo đi
*   Xem xét xem thông báo này đưa vào hàng đợi hay gửi ngay
*   Gửi ngay hoặc đưa vào hàng đợi

Công việc đầu tiên hết sức đơn giản, nó chỉ định dạng `$notifiables` vào một đối tượng Collection, để đảm bảo đối tượng này có thể sử dụng lặp lại.

Công việc thứ hai, nó sẽ bắt đầu kiểm tra xem lớp thông báo của chúng ta có implements interface `Illuminate\Contracts\Queue\ShouldQueue` này không, nếu có thì thông báo này chắc chắn phải đưa vào hàng đợi xử lý sau, ngược lại nó sẽ được gửi ngay.

Công việc cuối cùng cũng là nơi quan trọng nhất của thông báo, hãy khám phá xem thực chất việc gì đã xảy ra khi thông báo của chúng ta gửi ngay và khi đang ở trong hàng đợi nhé.

## Gửi thông báo đi ngay

Nếu thông báo của chúng ta được hiểu là gửi ngay, lúc này Channel Manager sẽ gọi phương thức `sendNow()` của lớp `NotificationSender`, phương thức này sẽ làm các việc sau:

1.  Chắc chắn rằng ID của thông báo được thiết lập
2.  Gửi instance thông báo đấy cho từng drivers/channels riêng biệt
3.  Gọi đến vài sự kiện liên quan

Đầu tiên, Laravel sẽ tác động sự kiện `Illuminate\Notifications\Events\NotificationSending`, với bất kỳ listener nào trả về `false` thì thông báo đấy sẽ không được gửi đi, bạn có thể dùng cách này để kiểm tra trước khi thông báo được gửi đi.

Sau đó sẽ tiếp tục tác động vào sự kiện `Illuminate\Notifications\Events\NotificationSent` nơi mà bạn có thể sử dụng để ghi nhận lịch sử hoặc dọn dẹp gì đấy.

Tiếp tục gửi thông báo đi, các đối tượng gửi sẽ gọi đến phương thức `build()` trong channel manager để xây dựng instance của kênh mà sử dụng để gửi đi và tiếp đó sẽ gọi đến phương thức `send()` tại channel đó.

Ngoài ra bạn có thể nhìn vào phương thức `sendNow()` bạn sẽ thấy có tham số thứ ba được truyền vào đó là các kênh mà bạn muốn gửi thông báo đi, từ đó bạn có thể dễ dàng ghi đè các kênh gửi thông báo mà không cần thay đổi cấu trúc lớp gốc, bạn cũng có thể gọi `sendNow()` thay vì `send()` để cho Laravel biết là thông báo của bạn sẽ gửi ngay mặc dùng lớp thông báo đó đang được định nghĩ là sẽ đưa vào hàng đợi `shouldQueue`:

```php
Notification::sendNow($users, new SampleNotification(), ['slack', 'mail']);
```

## Gửi thông báo qua hàng đợi

Đơn giản là để Laravel tạo ra một cái công việc hàng đợi duy nhất nơi mà tại đây nó sẽ gửi toàn bộ thông báo đến cho tất cả nơi đến, nhưng trong trường hợp một thông báo thất bại, điều này sẽ khiến toàn bộ công việc bị báo cáo là thất bại ngay cả khi một số thông báo thực sự được gửi và thử lại công việc có nghĩa là các thông báo đã được gửi thành công sẽ được gửi lại lần nữa.

Để ngăn việc này, Laravel sẽ tạo ra công việc hàng đợi riêng biệt cho từng kênh và từng thông báo một ví dụ như ta gửi thông báo cho 10 khách hàng về việc Cập nhật điều khoản riêng tư, và chúng ta cần gửi cho cả hai kênh là Email và SMS (tin nhắn truyền thống), lúc này Laravel sẽ tạo ra 20 công việc nhằm gửi thông báo cho 10 đối tượng 2 kênh khác nhau.

Laravel sẽ thiết lập ID riêng biệt cho từng thông báo từng người nhận một, sử dụng package [ramsey/uuid](https://github.com/ramsey/uuid), nó là ID duy nhất khi mà kênh Database được dùng và cũng là khoá chính của dòng đó, hoặc là khi bạn muốn broadcast thông báo đó.

Tóm gọn lại như sau:

*   Laravel gửi thông báo đấy vào hàng đợi với từng kênh và từng nơi nhận
*   Laravel sẽ thiết lập ID duy nhất cho đối tượng thông báo cho từng nơi nhận

Bên trong lớp `Illuminate\Notifications\NotificationSender` phương thức `queueNotification()` sẽ được gọi nếu như đối tượng thông báo này được đưa đến hàng đợi, và bên trong đấy laravel gửi đến instance của `Illuminate\Notifications\SendQueuedNotifications` vào hàng đợi, instance này thực chất là một công việc để các worker điều hành và giữ các tham chiếu `notifiable`, `notification`, `channel` và một số thông tin cần thiết cho các tác vụ hàng đợi như:

*   Connection được sử dụng là gì?
*   Hàng đợi được sử dụng chưa?
*   Có hoãn lại trước khi được gửi hay không?

### Vậy muốn định nghĩa các giá trị đó ở đâu?

Bạn có thể định nghĩa chúng bằng các thuộc tính công khai bên trong lớp thông báo:

```php
class PolicyUpdateNotification extends Notification implements ShouldQueue
{
    public $connection = 'redis';

    public $queue = 'urgent';

    public $delay = 60;
}
```

Hoặc bạn có thể dùng các phương thức của `Illuminate\Bus\Queueable` trait khi bạn áp dụng nó bên trong lớp thông báo của bạn.

```php
Notification::send($users,
    (new SampleNotification())->onConnection(...)->onQueue(...)->delay(...)
);
```

### Cái gì đang xảy ra bên trong SendQueuedNotifications?

Nó rất chi là đơn giản, nó chỉ gọi đến phương thức `sendNow()` của notification manager để cho thông báo gửi đi ngay.

Nó cũng thực hiện một số công việc dọn dẹp liên quan đến hàng đợi mà chúng ta sẽ không tìm hiểu trong lần này.

Đào đến đây thôi.

Tham khảo: [How Laravel's Notification System Works](https://divinglaravel.com/how-laravels-notification-system-works)
