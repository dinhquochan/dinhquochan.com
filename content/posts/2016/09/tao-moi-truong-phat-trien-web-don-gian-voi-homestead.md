---
title: Tạo môi trường phát triển web đơn giản với Homestead
date: "2016-09-22"
categories: "PHP"
tags:
  - "Development Tools"
  - "Web Development"
---

Bạn chỉ muốn tập trung vào việc code thôi và chắc rằng môi trường local giống môi trường production đương nhiên phải chắc chắn rằng bạn không cần làm những công đoạn lằng quằng đó. Đó chí là lý do ra đời của Homestead.

<!--more-->

## Lời giới thiệu

Bạn là một web developer, bạn hầu như chỉ biết dev sản phẩm của mình và hầu như các công việc ở giai đoạn lằng nhằng như cài LAMP (Linux – Apache – MySQL -PHP) hay LEMP (Linux – NginX – MySQL – PHP), cấu hình tên miền, cấu hình server hay đại loại là SSL quá lằng nhằng và tất nhiên việc bạn đem project của mình từ môi trường windows (WAMP) lên server linux thì đúng không thể nào lường trước được nó sẽ ra bao nhiêu là lỗi. Bạn chỉ muốn tập trung vào việc code thôi và chắc rằng môi trường local giống môi trường production đương nhiên phải chắc chắn rằng bạn không cần làm những công đoạn lằng quằng đó. Đó chí là lý do ra đời của Homestead.

**Homestead** do [Laravel](https://laravel.com/) phát triển, nó bao gồm:

*   Ubuntu 18.04
*   Git
*   PHP 7.3
*   PHP 7.2
*   PHP 7.1
*   PHP 7.0
*   PHP 5.6
*   Nginx
*   Apache (Optional)
*   MySQL
*   MariaDB (Optional)
*   Sqlite3
*   PostgreSQL
*   Composer
*   Node (With Yarn, Bower, Grunt, and Gulp)
*   Redis
*   Memcached
*   Beanstalkd
*   Mailhog
*   Neo4j (Optional)
*   MongoDB (Optional)
*   Elasticsearch (Optional)
*   ngrok
*   wp-cli
*   Zend Z-Ray
*   Go
*   Minio

Homestead có thể chạy trên cả Windows, Mac, và Linux vì thế bạn không cần lo ngại về việc nó có thể chạy trên hệ điều hành của mình không?

## Hướng dẫn cài đặt

### Chuẩn bị

Trước khi thiết lập một môi trường Homestead, bạn cần phải cài đặt [VirtualBox 5.x](https://www.virtualbox.org/wiki/Downloads) (miễn phí) hoặc [VMWare](http://www.vmware.com/) (có phí), [Git](https://git-scm.com/downloads) và [Vagrant](http://www.vagrantup.com/downloads.html). Các phần mềm trên đều rất dễ cài đặt và tất nhiên đều hỗ trợ đa nền tảng.

Nếu bạn sử dụng VMware, bạn phải mua cả bản VMware Fusion / Workstation và [VMware Vagrant plug-in](http://www.vagrantup.com/vmware). Nó không miễn phí nhé, VMware mới có thể dễ dàng chia sẽ nhanh chóng thư mục, tập tin từ Homestead và Máy của ta.

### Cài đặt Homestead

Tải box Homestead trên Vagrant, bằng cách mở cửa sổ dòng lệnh ra (CMD với Windows hoặc Terminal với Linux/Unix) và gõ dòng lệnh sau:

```
vagrant box add laravel/homestead
```

Nó sẽ hỏi là bạn dùng VirtualBox hay VNWare, nhớ chọn cho phù hợp nhé.

### Chuẩn bị Homestead

Chúng ta clone file cấu hình từ Github, ta gõ tiếp:

```
# windows phải là thư mục C:\Users\Username còn trên Linux/Unix thì là ~
cd ~
git clone https://github.com/laravel/homestead.git Homestead
```

> Chú ý: một Virtual Machine dùng cho tất cả các webapp.

Trong thư mục **Homestead**, bạn hãy chạy lệnh `bash init.sh` hoặc `init.bat` (với Windows) để tạo ra tập cấu hình **Homestead.yaml**. **Homestead.yaml** sẽ được lưu tại thư mục ẩn **~/.homestead**

### Cấu hình Homestead:

Tại thư mục `~/.homestead` có tập tin `Homestead.yaml` – tập tin này sẽ chứa tất cả các website của chúng ta.

#### Provider

```yaml
# IP mặc định
ip: "192.168.10.10"

# RAM cho máy ảo

memory: 2048

# Số CPU sử dụng

cpus: 1

# Provider có thể là virtualbox, vmware_fusion, hoặc vmware_workstation
provider: virtualbox

```

#### Cách tạo SSH (nếu chưa có)

Dùng lệnh `ssh-keygen -t rsa -C "your@email.com"`. Thay `your@email.com` bằng email của bạn. (Những bạn windows có thể sử dụng [PuTTYgen](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)).

Thêm key SSH cho homestead:

```yaml
# Key public
authorize: ~/.ssh/id_rsa.pub
# Key private
keys:
    - ~/.ssh/id_rsa
```

> **Chú ý** là có dấu `–` ở đàu mỗi keys.

#### Thư mục Shared

Tiếp theo là cấu hình thư mục Shared (thưc mục kết nối giữa máy thực và máy ảo)

```yaml
folders:
    # thư mục trên máy ảo
    - map: ~/Code
    # thư mục trên máy thực
      to: /home/vagrant/Code
```

#### Cấu hình Website

```yaml
sites:
 # tên miền
 - map: homestead.test
 # thư mục trỏ đến
   to: /home/vagrant/Code/homestead/public
```

Nếu website của bạn có sử dụng [HHVM](http://hhvm.com/) thì bạn chỉ cần thêm một thuộc tính là hhvm với giá trị là `true`.

```yaml
sites:
 # tên miền
 - map: homestead.test
 # thư mục trỏ đến
   to: /home/vagrant/Code/test/public
   hhvm: true
```

> **Chú ý:** khi bạn thay đổi site, thì khi muốn Homestead cập nhật bạn cần dùng lệnh `vagrant reload --provision` hoặc `vagrant provision`

Ta cần chỉnh sửa **Hosts** để có thể chạy được các tên miền ảo, ở Linux hay OS X thì nó ở `hosts`. Thêm các dòng như sau:

```
192.168.10.10 homestead.test
```

#### Chạy Homestead

Sau khi hoàn tất việc cấu hình Homestead bạn chỉ cần dùng 1 câu lệnh duy nhất:

```
vagrant up
```

ngay lập tức mọi thức sẽ “up” ngay! nào lúc đó hãy vào thử [http://laravel.app](http://laravel.app) xem điều gì sẽ xảy ra nhé

Để hủy bỏ máy Homestead này bạn dùng lệnh `vagrant destroy --force` hoặc `vagrant halt` để tắt máy homestead.

### Database, SSH, PORT

#### Port

Mặc đinh, Homestead sẽ cấu hình như sau:

*   **SSH:** 2222 → Forwards To 22
*   **HTTP:** 8000 → Forwards To 80
*   **HTTPS:** 44300 → Forwards To 443
*   **MySQL:** 33060 → Forwards To 3306
*   **Postgres:** 54320 → Forwards To 5432

Thêm Port

```yaml
ports:
    - send: 93000
    to: 9300
    - send: 7777
    to: 777
    protocol: udp
```

**DATABASE**

Mặc đinh Homestead cấu hình giống như trong file **.env** của Laravel

Để kết nối với MySQL hoặc Postgres bằng công cụ **Navicat** hay **Sequel Pro**, hãy kết nối máy chủ `54320` (Postgres). Thông tin đăng nhập là `homestead` / `secret`.

#### SSH

Rất đơn giản, Chỉ cần dùng lệnh `vagrant ssh` để kết nối SSH của Homestead.

## Ví dụ một Project mới

```yaml
---
ip: "192.168.10.10"
memory: 2048
cpus: 1
provider: virtualbox

authorize: ~/.ssh/id_rsa.pub

keys:
 - ~/.ssh/id_rsa

folders:
 - map: D:\Hometead
 to: /home/vagrant/Code

sites:
 - map: laravel.test
   to: /home/vagrant/Code/laravel/public
 - map: project-demo.test
   to: /home/vagrant/Code/project-demo/public

databases:
 - homestead
 - project_demo

```

Mở hosts và chỉnh sửa:

```
192.168.10.10 laravel.test
192.168.10.10 project-demo.test
```

Mình dùng thêm `--provision` vì đã thêm 1 website mới vào đó.

```
vagrant up --provision
```

Tiếp đến mình gõ từ trình duyệt `http://project-demo.test` thật tuyệt vời phải không nào 👏

Tất cả file web của mình sẽ nằm trong thư mục như cấu hình trên `D:\Hometead\project-demo`

## Lời kết

Homestead ra đời nó giúp cho ta tiếc kiệm rất nhiều thời gian vào các dự án của mình, không còn lo lắng nhiều liệu môi trường trên local và môi trường của khách có phù hợp không, không cần thực hiện các công việc lằng nhằng để tạo ra một máy chủ ảo trên máy. Và nó kiến mình phải thốt lên rằng Homestead!
