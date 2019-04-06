---
title: How I work ever single day?
date: "2018-10-23T10:40:32.169Z"
template: "post"
draft: false
slug: "/2018/10/how-i-work-ever-single-day/"
category: "Personal"
tags:
  - "Coffee"
description: "Tản mạn về một ngày làm việc của một developer sẽ như thế nào và những công cụ mà mình dùng bao gồm những gì."
---

Sẵn dịp làm lại cái blog cùi này mình sẽ chia sẻ về cách mà mình làm việc cũng như những công cụ mà mình đang dùng. Thời điểm mình viết bài này là tháng 10 năm 2018. Khi có thay đổi mình sẽ ghi chú ở dưới.

![selective focus photography of short-coated brown puppy facing right side](https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ)

Photo by [Berkay Gumustekin](https://unsplash.com/@berkaygumustekin?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

## Công việc hằng này

Mình đang làm việc full-time tại một công ty công nghệ giải pháp website nên khối lượng lớn thời gian mình ở văn phòng. Bình thường không có gì thay đổi thì 8:00 AM mình đã bắt đầu công việc cho đến 5:30 PM, công việc mỗi ngày chủ yếu là xây dựng các ứng dụng PHP trên nền tảng Laravel Framework.

Mình thường dành một vài phút để kiểm tra hộp thư mail và lặp lại việc đó sau hai hoặc ba giờ vì không muốn bỏ lỡ một email nào. Sau đó tất nhiên là "working time" rồi.

Sau khi tan ca, tất nhiên là ở nhà và sau khi xong bữa tối, mình thường theo dõi các tin tức từ [Hacker News](https://news.ycombinator.com/), [Laravel News](https://laravel-news.com/), từ mailist của PHP hoặc các tweets từ các developers khác trên thế giới trong đó có @[Taylor Otwell](https://twitter.com/taylorotwell) (tác giả Laravel), @[Themsaid](https://twitter.com/themsaid), @[Wathan](https://twitter.com/adamwathan), @[Jeffrey](https://twitter.com/jeffrey_way)... theo dõi các repositories trên Github. Nếu còn sức thì sẽ viết thêm một vài dòng code, nghe vài bản nhạc rồi nghỉ ngơi chuẩn bị cho ngày làm việc tiếp theo.

## Công cụ làm việc

Máy làm việc chính của mình là Macbook Pro 13' (đời 2017) với Core i5 kèm với cái màn hình Dell Ultra Sharp 25' 2K 2018 và tất nhiên là hệ điều hành macOS kèm đó là mình có dùng con Magic Mouse 2.

## Phần mềm làm việc

### Editor

Mình dùng [PhpStorm](https://www.jetbrains.com/phpstorm/) là IDE chính cho việc phát triển ứng dụng, với giao diện tối cùng với theme Material, font [Operator Mono](https://www.typography.com/fonts/operator/styles/) cùng với vài plugin trong đó có .gitinore, .env, Laravel Plugin, EditorConfig...

Ngoài ra mình còn dùng Sublime Text là trình soạn thảo code chính, cũng như PhpStorm. Mình vẫn dùng colorscheme Material và font [Operator Mono](https://www.typography.com/fonts/operator/styles/) cùng vài packages: AdvancedNewFile, Babel, Vue Syntax Highlight, PHP SublimeLinter, PHP Companion, [Sublime PHPUnit](https://github.com/adamwathan/sublime-phpunit) (thanks Wathan)...

![](/images/2018/12/sublime-text-3.png)

My Sublime Text

Dưới đây là cấu hình Sublime Text mà mình dùng:

```json
{
    "bold_folder_labels": true,
    "caret_style": "phase",
    "close_windows_when_empty": true,
    "color_scheme": "Packages/Dracula Color Scheme/Dracula.tmTheme",
    "ensure_newline_at_eof_on_save": true,
    "findreplace_small": true,
    "font_face": "Operator Mono Book",
    "font_size": 18,
    "hot_exit": false,
    "ignored_packages":
    [
        "Vintage"
    ],
    "line_padding_bottom": 8,
    "line_padding_top": 8,
    "open_files_in_new_window": false,
    "overlay_scroll_bars": "enabled",
    "phpunit-sublime-terminal": "iTerm",
    "remember_open_files": true,
    "scroll_past_end": true,
    "show_definitions": false,
    "show_panel_on_build": false,
    "theme": "Default.sublime-theme",
    "translate_tabs_to_spaces": true,
    "trim_trailing_white_space_on_save": true,
    "word_wrap": false
}
```

Mình là thích để chữ hơi to và nhiều khoản rộng để có trải nghiệm thoải mái nhất, các bạn có thể tham khảo bài này [The Visual Perception of Code](https://stitcher.io/blog/visual-perception-of-code)

### Terminal

Chắc chắn rồi đã là một web developer thì sẽ không thể thiếu Termial. Mình sử dụng [iTerm2](https://www.iterm2.com/index.html) và [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh) (với [Cobalt 2](https://github.com/wesbos/Cobalt2-iterm) theme).

### Database

Mình dùng [Sequel Pro](https://www.sequelpro.com/) để quản lý MySQL.

### Others

*   Mình dùng [Laravel Valet](https://laravel.com/docs/5.7/valet) để tạo môi trường local cho các dự án
*   PHPUnit để testing
*   [Alfred](https://www.alfredapp.com/) để tìm kiếm và thao tác nhanh trong macOS
*   GoTiengViet để gõ tiếng Việt 😅
*   [Evernote](https://evernote.com/) để ghi chú mọi thứ trên đời
*   Mình dựng các videos cho [Vietcasts](https://www.youtube.com/channel/UCOasc5qdlxUPe-PS6v0zrvg) bằng [ScreenFlow](https://www.telestream.net/)
*   Mình dùng [Sublime Merge](https://www.sublimemerge.com/) để quản lý các Git repos
*   Trình duyệt chính của mình là [Google Chrome](https://www.google.com/chrome/) đôi khi sẽ dùng [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/)
*   Khi rảnh rỗi mình dùng dịch [Apple Music](https://www.apple.com/vn/music/) để nghe nhạc
*   Mình có dùng dịch vụ của [DigitalOcean](https://digitalocean.com)
*   ... nghĩ ra mình sẽ ghi tiếp vào đây 👏👏

Tạm thời bấy nhiêu thôi, rảnh rỗi mình sẽ cập nhật tiếp.
