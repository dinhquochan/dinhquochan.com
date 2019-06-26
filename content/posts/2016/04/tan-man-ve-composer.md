---
title: Tản mạn về Composer
date: "2016-04-11"
categories: "PHP"
tags:
  - "Development Tools"
  - "Web Development"
---

Trước khi Composer ra đời, chúng ta thường khó chịu với hàng tá các thư viện của bên thứ ba cần phải quản lý, rất khó khăn để cập nhật và còn lại các khâu cài đặt lằng quằng. Đó là quá khứ thôi, sự ra đời của Composer đã làm thay đổi hoàn toàn mọi thứ rồi. Trong bài viết này chúng ta sẽ tìm hiểu về Composer thực chất nó là gì.

<!--more-->

## Composer là gì ?

Composer là một công cụ quản lý các thư viện trong PHP (Dependency Management), công cụ này giúp ta tiết kiệm khá nhiều thời gian với các gói thư việ cần thiết mà project của bạn cần sử dụng, bạn chỉ cần khai báo nó, composer sẽ tự động tải code của các thư viện về thông qua một server cộng đồng.

Composer giúp ta quản lý thư viện một cách chuyên biệt từng project không giống như APT hay YUM (linux) dùng chung mà nó tương tự như npm của NodeJS, tức là ví dụ bạn có PROJECT A và PROJECT B thì nếu bạn cần thư viện LIB X thì khi cài đặt thư viện LIB X sẽ được thêm ngay vào trong từng thư mục PROJECT A và PROJECT B.

Composer là một mã nguồn mở (OpenSource) nên được cộng đồng hỗ trợ rất nhiều, bạn có thể tham gia phát triển, phát triển lại từ [trang Github chính thức của Composer](https://github.com/composer/composer).

## Tại sao lại cần Composer ?

Như mình đã nói ở trên Composer ra đời để giải quyết các vấn đề khó khăn như dung lượng project sẽ lơn hơn, việc cập nhật cũng như chèn vào project rất phức tạp và phiền phức. Với composer, bạn sẽ cần khai báo tên và version của các thư viện mà bạn có sử dụng mà không cần phải tự tay chép code của nó vào project, composer sẽ tự động tìm và tải thư viện mà bạn cần trên Server, nếu trong thư viện đó có dùng các thư viện khác thì nó cũng sẽ tải các thư viện khác về, nó đệ quy cho đến khi tải đủ các thư viện, thật tuyệt vời phải không nào.

Khi bạn sử dụng VCS, bạn sẽ chỉ cần commit tên version, tên thư viện ở file cấu hình composer.json mà không cần phải commit những thay đổi trong code của các thư viện như trước. Mặt khác, khi trong project của bạn có các thư viện mà các thư viện ấy lại dùng thư viện khác và khi đó chỉ cần một trong những cái đó có update thì composer sẽ tự động update giùm bạn luôn, thật tiện lợi quá đi mà.

## Hướng dẫn cài đặt Composer

### Yêu cầu để cài Composer

Để cài được composer vào máy bạn cần phải cài đặt sẵn PHP 5.3.2+, và nên cài sẳn Git để hỗ trợ tốt hơn với các gói thư viện. Composer hỗ trợ tốt trên ba nền tản OS X, Windows và cả Linux.

### Composer Trên Linux / Unix / OSX

bạn mở Terminal lên và nhập lần lượt từng dòng lệnh sau:

```
sudo php -r "readfile('https://getcomposer.org/installer');" > composer-setup.php
sudo php composer-setup.php --install-dir=bin
sudo php -r "unlink('composer-setup.php');"
```

Hoặc bạn có thể download composer.phar từ [https://getcomposer.org/](https://getcomposer.org/) (ở cuối trang) sau đó duy chuyển nó vào trong thư mục `bin` bằng lệnh

```
sudo mv composer.phar /usr/local/bin/composer
```

### Composer Trên Windows

#### Dùng bộ cài tự động

Đây là cách cài dễ dàng nhất, bạn chỉ việc tải về **Composer-Setup.exe** sau đó cài như một phần mềm bình thường (nhớ trỏ đến php.exe đã cài sẵn trên máy tính đúng chỗ). Composer Installer sẽ tự động cài và thêm vào **PATH** sẵn cho bạn để bạn có thể dùng lệnh composer trên CMD.

### Cài Thủ Công

Như ở trên, bạn tải về composer.phar từ [https://getcomposer.org/](https://getcomposer.org/) (ở cuối trang) sau đó duy chuyển nó vào trong thư mục bất kỳ bạn muốn, ở đây tớ ví dụ là `C:\bin` nhé.

Bạn tạo tập tin có tên là **composer.bat** với nội dung như sau:

```
echo @php "%~dp0composer.phar" %*>composer.bat
```

Để dùng được lệnh composer trên CMD bạn cần phải thêm thư mục Composer vào _PATH environment variable_. Bạn có thể xem cách thực hiện dưới đây hoặc bằng Google :)

Vào **File Exploder**, chọn chuột phải vào **This PC**, chọn **Properties**, chọn **Advanced System Settings**, ở cửa sổ Pop-up chọn **Envaironment Variables**…

Ở **System Variables** chọn vào mục Path và bấm vào nút Edit

Bấm vào New sau đó thêm vào `C:\bin` (thư mục cài composer như trên) sau đó bấm OK

Xong bây giờ bạn có thể mở CMD và đánh vào câu lệnh sau để kiểm tra: `composer -v`

## Hướng dẫn sử dụng Composer

### Cách dùng cơ bản

Có hai phần riêng biệt để quản lý dependencies bằng Composer. Đầu tiên là command line tool của Composer cho việc nắm giữ và quản lý các dependencies. Thứ hai là [Packagist](https://packagist.org/) – Đây là nơi lưu trữ các package mà bạn muốn sử dụng.

Khi sử dụng Composerc trong thư mục gốc chúng ta có một tập tin JSON là **composer.json** có nội dung:

```json
{
    "name": "dinhquochan/my_project",
    "description": "My New Project",
    "authors": [
        {
            "name": "Dinh Quoc Han",
            "email": "contact@dinhquochan.com"
        }
    ],
    "require": {
        "monolog/monolog": "1.12.0"
    }
}

```

Trong tập tên trên có các phần như sau:

*   **name** tên dự án có dạng **vendor\_name/package\_name**.
*   **description** mô tả gói của bạn.
*   **authors** tác giả của dự án.
*   **require** đây chính là danh sách các package thư viện cần thiết, nó sẽ lấy từ server về. sẽ có 2 phần là tên vendor/ tên gói cùng với chỉ định version hay không.

Trong trường hợp trên mình đã yêu cầu Monolog, một framework phổ biến dùng để logging. Chỉ vì tôi có một file JSON với thông tin này không có nghĩa là chúng ta sử dụng được có thể sử dụng Monolog. Chúng ta phải vào Terminal tại thư mục hiện tại với câu lệnh:

```
composer install
```

Nó sẽ đưa tất cả dependencies của dự án vào thư mục mang tên vendor và thực hiện các công việc cần thiết khác. Cùng lúc đó nó sẽ tạo ra file composer.lock để biết là composer đã được thiết lặp tại thư mục mình sẽ nói cái này ở dưới. và các bạn hãy kiểm tra thử thư mục vendor xem ắt hẳn các thư viện đã được tải về và một file autoload.php.

Ngay lúc này, để sử dụng được các thư viện đó bạn chỉ viện chèn **autoload.php** vào file cần thiết:

```
require "vendor/autoload.php";
```

Sau đó làm theo hướng dẫn sử dụng của Package đó là xong, ở đây tớ ví dụ monolog nhé:

```php
<?php

require "vendor/autoload.php";

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

// create a log channel
$log = new Logger('name');
$log->pushHandler(new StreamHandler('path/to/your.log', Logger::WARNING));

// add records to the log
$log->addWarning('Foo');
$log->addError('Bar');
```

## Chỉ định version cho các Package trong Composer

Trong composer.json trên chúng ta thấy ta đang sử dụng version `1.12.0` nhưng nếu muốn dùng phiên bản khác thì sao? Có 6 cách để xác định version mà bạn muốn, hãy tìm hiểu xem:

### Version Range

Bằng cách sử dụng các toán tử so sánh bạn có thể lấy version cao hơn, thấp hơn hoặc tuân theo một số các nguyên tắc thậm chí phức tạp hơn như sử dụng `AND` và `OR`. Các toán tử có thể là`>`, `<`,`> =`, `<=` và `!=`. `AND` được biểu diễn bằng một dấu cách hoặc dấu phẩy, OR được biểu diễn bằng hai dấu gạch dọc: `||`.

Ví dụ `>2.7` nghĩa là bất kỳ version nào trên `2.7. >2.7 <=3.5` bao gồm các version từ `2.7` trở lên tới `3.5` (bao gồm cả `3.5`).

### Wildcard Versions

Bằng cách sử dụng một ký tự đại diện, bạn có thể xác định một pattern. x.x.\* sẽ bao gồm tất cả các version x.x.0 trở lên và trở xuống (tất nhiên cả x.x, nhưng không bao gồm x.y.0.

Ví dụ `2.3.*` sẽ bao gồm từ `2.3.0` trở lên và trừ `2.4` Nó tương đương với `>=2.3.0 <2.4`

### Hyphen Ranges

Hyphen Ranges cho phép bạn xác định range dễ dàng hơn, mặc dù bạn sẽ cảm thấy bối rối hơn một chút vì cách nó xử lý các partial version. Full version gồm ba số trong trường hợp hyphen ranges thực hiện đầy đủ ý nghĩa của nó

`2.0.0 - 3.0.0` nghĩa là tất cả các version bao gồm `2.0.0` trở lên và bao gồm `3.0.0` trở xuống.

`2.0 - 3.0` bao gồm bất kỳ version nào kể cả `2.0` trở lên nhưng không bao gồm version `3.1`

Lý do cho hành động tưởng chừng như kỳ lạ này là phần bên trái dấu gạch ngang nghĩa là bao gồm, còn phần bên phải hoàn toàn chỉ là một ký tự đại diện. Biểu thức trên sẽ tương đương với `>=2.1 <3.1.0`

### Tiddle Range

Tiddle Range rất tuyệt vời để đáp ứng các yêu cầu nhỏ nhất cho việc xác định version và chấp nhận bất kỳ version nào trở lên, nhưng không bao gồm chính nó. Nếu chỉ rõ là `~3.6` thì bạn chấp nhận các version từ 3.6 trở lên nhưng không bao gồm `4.0.`

Method này tương đương với `>-3.6 <4.0`

### Caret Range

Caret Range có nghĩa là chấp nhận tất cả các phiên bản hiện tại tính từ nó nhưng không bao gồm phiên bản lớn hơn. Ví dụ `^3.3.5` bạn chấp nhận bất kỳ version nào trở lên, nhưng không bao gồm`4.0`

### Dev-Master

Với dev-master bạn đang giữ version mới nhất được phát triển nhưng không được tag với một version number cụ thể. Điều này có thể tốt trong khi phát triển nhưng bạn cần nhận thức được sự tiềm tàng về bugs là cao hơn so với các version kia

## Locking trong Composer

Locking là một trong những tính năng hữu ích nhất của Composer. Trước tiên ta sẽ nói đến composer.lock. Công việc của nó là khóa lại các versions của các components đã sử dụng. Lock file có thể chắc chắn rằng mọi người làm việc với các versions giống nhau của các files.

Khi lần đầu tiên sử dụng Composer để lấy một dependency nó sẽ ghi chính xác version vào file Composer.lock. Ví dụ như nếu bạn chỉ rõ `2.3.*` và `2.3.5` là version mới nhất thì version được cài đặt sẽ là `2.3.5` và nó sẽ được đưa vào trong lock file.

Giả sử sau 1 tuần có một developer gia nhập team của bạn. Trong thời gian này dependency đã được update lên `2.3.6`. Nếu anh ta sử dụng câu lệnh (composer install) thì sẽ nhận được`2.3.5` vì nó đã được ghi trong file lock.

Tất nhiên bạn có thể quyết định việc update các dependencies của mình. Trong trường hợp đó, bạn sẽ thực hiện lệnh :

```
composer update
```

Nó sẽ lấy các version mới nhất và ghi chúng vào file lock.

> **Chú ý**: Không bao giờ chạy lệnh composer update trong môi trường thực tế (production) mà hãy kiểm tra trên máy để tránh tình trạng không tương thích.

## Require-dev

Composer cho phép bạn xác định các dependency cho môi trường dev. Điều này được thực hiện bằng cách xác định các dependency của bạn trong mảng require-dev thay vì mảng require.

```json
{
    "name": "dinhquochan/my_project",
    "description": "My New Project",
    "authors": [
        {
            "name": "Dinh Quoc Han",
            "email": "contact@dinhquochan.com"
        }
    ],
    "require": {
        "monolog/monolog": "1.12.0"
    },
    "require-dev" : {
        "fzaninotto/faker": "dev-master"
    }
}
```

**Faker** là một thư viện tạo ra các dữ liệu mẫu. Điều này là rất tốt trong khi bạn đang dev để test thử nhưng khi đã public sản phẩm thì nó lại không thực sự cần thiết. Nếu muốn loại trừ các yêu cầu phát triển, bạn cần thực hiện lệnh install hoặc update với tùy chọn –no-dev

```
composer install --no-dev
```

## Lời Kết

Composer giúp lập trình viên giảm bớt suy nghĩ về các thư viện và chỉ tập trung vào ứng dụng chính của mình. Tiết kiệm khá nhiều thời gian để làm những việc khác.
Hiện tại, hầu hết các Framework đều hỗ trợ Composer, như : CodeIgniter, Symfony2, Laravel, FuelPHP… Composer đúng là một công cụ tuyệt vời dành cho PHP.
