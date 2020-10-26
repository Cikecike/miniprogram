/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 8.0.22 : Database - miniprogram
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`miniprogram` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `miniprogram`;

/*Table structure for table `artic_content` */

DROP TABLE IF EXISTS `artic_content`;

CREATE TABLE `artic_content` (
  `artic_key` bigint unsigned NOT NULL COMMENT '文章索引',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '文章内容',
  PRIMARY KEY (`artic_key`),
  CONSTRAINT `artic_content` FOREIGN KEY (`artic_key`) REFERENCES `article` (`artic_key`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `artic_content` */

insert  into `artic_content`(`artic_key`,`content`) values 
(1,'六王毕，四海一；蜀山兀，阿房出。覆压三百余里，隔离天日。骊山北构而西折，直走咸阳。二川溶溶，流入宫墙。五步一楼，十步一阁；廊腰缦回，檐牙高啄；各抱地势，钩心斗角。盘盘焉，囷囷焉，蜂房水涡，矗不知其几千万落！长桥卧波，未云何龙？复道行空，不霁何虹？高低冥迷，不知西东。歌台暖响，春光融融；舞殿冷袖，风雨凄凄。一日之内，一宫之间，而气候不齐。\r\n\r\n妃嫔媵嫱，王子皇孙，辞楼下殿，辇来于秦，朝歌夜弦，为秦宫人。明星荧荧，开妆镜也；绿云扰扰，梳晓鬟也；渭流涨腻，弃脂水也；烟斜雾横，焚椒兰也。雷霆乍惊，宫车过也；辘辘远听，杳不知其所之也。一肌一容，尽态极妍，缦立远视，而望幸焉；有不见者，三十六年。\r\n\r\n燕、赵之收藏，韩、魏之经营，齐、楚之精英，几世几年，剽掠其人，倚叠如山。一旦不能有，输来其间。鼎铛玉石，金块珠砾，弃掷逦迤，秦人视之，亦不甚惜。\r\n\r\n嗟乎！一人之心，千万人之心也。秦爱纷奢，人亦念其家；奈何取之尽锱铢，用之如泥沙？使负栋之柱，多于南亩之农夫；架梁之椽，多于机上之工女；钉头磷磷，多于在庾之粟粒；瓦缝参差，多于周身之帛缕；直栏横槛，多于九土之城郭；管弦呕哑，多于市人之言语。使天下之人，不敢言而敢怒；独夫之心，日益骄固。戍卒叫，函谷举；楚人一炬，可怜焦土。\r\n\r\n呜呼！灭六国者，六国也，非秦也。族秦者，秦也，非天下也。嗟乎！使六国各爱其人，则足以拒秦；使秦复爱六国之人，则递三世可至万世而为君，谁得而族灭也？秦人不暇自哀，而后人哀之；后人哀之而不鉴之，亦使后人而复哀后人也。 '),
(2,'def login():\r\n    print(request.data)\r\n    # 获取表单提交的数据用request.form\r\n    name = request.form.get(\"name\")\r\n    password = request.form.get(\"password\")\r\n    # 获取相同名称，返回列表\r\n    name_li = request.form.getlist(\"name\")\r\n    # 获取queryString数据用\r\n    city = request.args.get(\"city\")\r\n    # 判断请求类型\r\n    if request.method == \"GET\":\r\n        pass\r\n    elif request.method == \"POST\":\r\n        pass\r\n    # 获取json数据\r\n    j_name = request.json.get(\"name\")\r\n    return \"name=%s, password=%s\" % (name, password)'),
(3,'要实现水平/垂直居中，css设置\r\n\r\ndisplay: flex;\r\njustify-content: center; //水平居中\r\nalign-items:center;  //垂直居中\r\n样例\r\n\r\n\r\n第二层是设置margin-left后的效果\r\n\r\n代码\r\nxml\r\n\r\n<view class=\'container-in\'>\r\n    <label>头像</label>\r\n</view>\r\n<view class=\'line\'></view>\r\n \r\n<view class=\'container-in\'>\r\n  <view>\r\n      <label>Sakura</label>\r\n  </view>\r\n</view>\r\ncss\r\n\r\n.container-in{\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items:center;\r\n  width: 100%;\r\n  height: 80px;\r\n \r\n}\r\n '),
(4,'一、基本概念\r\n触发器是一种特殊类型的存储过程，它不同于存储过程，主要是通过事件触发而被执行的，即不是主动调用而执行的；而存储过程则需要主动调用其名字执行\r\n\r\n触发器：trigger，是指事先为某张表绑定一段代码，当表中的某些内容发生改变（增、删、改）的时候，系统会自动触发代码并执行。\r\n\r\n\r\n二、作用\r\n可在写入数据前，强制检验或者转换数据(保证护数据安全)\r\n触发器发生错误时，前面用户已经执行成功的操作会被撤销，类似事务的回滚\r\n\r\n三、创建触发器\r\n基本语法\r\n\r\ndelimiter 自定义结束符号\r\ncreate trigger 触发器名字 触发时间 触发事件 on 表 for each row\r\nbegin\r\n    -- 触发器内容主体，每行用分号结尾\r\nend\r\n自定义的结束符合\r\n\r\ndelimiter ;\r\n1\r\n2\r\n3\r\n4\r\n5\r\n6\r\n7\r\n8\r\non 表 for each：触发对象，触发器绑定的实质是表中的所有行，因此当每一行发生指定改变时，触发器就会发生\r\n\r\n\r\n触发时间\r\n当 SQL 指令发生时，会令行中数据发生变化，而每张表中对应的行有两种状态：数据操作前和操作后\r\n\r\nbefore：表中数据发生改变前的状态\r\nafter：表中数据发生改变后的状态\r\nPS：如果 before 触发器失败或者语句本身失败，将不执行 after 触发器(如果有的话)\r\n\r\n\r\n触发事件\r\n触发器是针对数据发送改变才会被触发，对应的操作只有\r\n\r\nINSERT\r\nDELETE\r\nUPDATE\r\n\r\n注意事项\r\n在 MySQL 5 中，触发器名必须在每个表中唯一，但不是在每个数据库中唯一，即同一数据库中的两个表可能具有相同名字的触发器\r\n每个表的每个事件每次只允许一个触发器，因此，每个表最多支持 6 个触发器，before/after insert、before/after delete、before/after update\r\n\r\n例子\r\n1.首先创建两张表，商品表和订单表\r\n\r\n\r\n2.如果订单表发生数据插入，对应的商品库存应该减少。因此这里对订单表创建触发器\r\n\r\n语法\r\n\r\ndelimiter ##\r\n-- 创建触发器\r\ncreate trigger after_insert_order after insert on orders for each row\r\nbegin\r\n    -- 更新商品表的库存，这里只指定了更新第一件商品的库存\r\n    update goods set goods_num = goods_num - 1 where id = 1;\r\nend\r\n##\r\n\r\ndelimiter ;\r\n1\r\n2\r\n3\r\n4\r\n5\r\n6\r\n7\r\n8\r\n9\r\n10\r\n成功创建触发器\r\nimage\r\n\r\n\r\n四、查看触发器\r\n1.查看全部触发器\r\n语法：show triggers;\r\n\r\n\r\n2.查看触发器的创建语句\r\n语法：show create trigger 触发器名字;\r\n\r\n我们来查看刚才创建的触发器\r\n在这里插入图片描述\r\n\r\n\r\n五、触发触发器\r\n基本语法：drop trigger 触发器名字\r\n\r\n触发不是自动手动触发的，而是在对应的事件发生后才会触发。比如我们创建的触发器，只有在对订单表进行数据操作的时候，触发器才会执行\r\n\r\n我们对 orders 表进行数据插入，看看是否触发了触发器\r\n在这里插入图片描述\r\n可以看到，在我们对 orders 表进行数据插入的时候，确实 goods 表 id 为 1 的商品的库存发生了改变。但是这是有问题的，即使我们买了 5 个 id 为 1 的商品，对应的 goods 表却只减了 1\r\n\r\n如果我们买 5 个 id 为 2 的商品，也只是 goods 表 id 为 1 的商品的发生改变，也是不正确的\r\n在这里插入图片描述\r\n\r\n\r\n六、删除触发器\r\n触发器不能修改，只能删除\r\n\r\n语法：drop trigger + 触发器名字\r\n\r\n\r\n\r\n七、触发器应用\r\n触发器针对的是数据库中的每一行记录，每行数据在操作前后都会有一个对应的状态，触发器将没有操作之前的状态保存到 old 关键字中，将操作后的状态保存到 new 中\r\n\r\n语法：old/new.字段名\r\n\r\n需要注意的是，old 和 new 不是所有触发器都有\r\n\r\n触发器类型	new和old的使用\r\nINSERT型触发器	没有 old，只有 new，new 表示将要(插入前)或者已经增加(插入后)的数据\r\nUPDATE型触发器	既有 old 也有 new，old 表示更新之前的数据，new 表示更新之后的数据\r\nDELETE型触发器	没有 new，只有 old，old 表示将要(删除前)或者已经被删除(删除后)的数据\r\n我们根据这个重新创建根据订单数据改变自动修改库存的触发器\r\n\r\ndelimiter ##\r\n-- 创建触发器\r\ncreate trigger after_insert_order after insert on orders for each row\r\nbegin\r\n    -- new 代表 orders 表中新增的数据\r\n    update goods set goods_num = goods_num - new.goods_num where id = new.goods_id;\r\nend\r\n##\r\ndelimiter ;\r\n1\r\n2\r\n3\r\n4\r\n5\r\n6\r\n7\r\n8\r\n9\r\nPS：对于 auto_increment 列，new 在 insert 执行之前包括 0，在 insert 执行之后包括新的自动生成的值\r\n\r\n这里我们可以根据新插入的 orders 表中的数据来修改 goods 表的库存，此时新插入的数据用 new 来表示\r\nimage\r\n如果买 5 个 id 为 1 的商品，此时 id 为 1 的商品的库存得到正确的修改。当然，如果买其他种类的商品，最后得到的结果也是正确的，这里就不一一演示了\r\n\r\n\r\nPS\r\n\r\n当然我们还需要考虑一种情况：如果此时商品的库存不够了，该怎么处理？\r\n\r\ndelimiter ##\r\n-- 创建触发器\r\ncreate trigger before_insert_order before insert on orders for each row\r\nbegin\r\n    -- 取出 goods 表中对应 id 的库存\r\n    -- new 代表 orders 表中新增的数据\r\n    select goods_num from goods where id = new.goods_id into @num;\r\n    \r\n    -- 用即将插入的 orders 表中的库存和 goods 表中的库存进行比较\r\n    -- 如果库存不够，中断操作\r\n    if @num < new.goods_num then\r\n        -- 中断操作：暴力解决，主动出错\r\n        insert into xxx values(xxx);\r\n    end if;\r\nend\r\n##\r\ndelimiter ;\r\n1\r\n2\r\n3\r\n4\r\n5\r\n6\r\n7\r\n8\r\n9\r\n10\r\n11\r\n12\r\n13\r\n14\r\n15\r\n16\r\n17\r\n直接创建这个触发器\r\n\r\n如果我们买 id 为 3 的商品 100 件，可以看到，此时报错，同时 orders 表和 goods 表的数据并没有得到更新\r\n\r\n可以看到，数据连 orders 表都未能插入，那么肯定就不会执行 insert after 这个触发器了\r\n\r\n同时，如果在触发器中出现错误，那么前面的已经执行的操作也会全部清空\r\n\r\n\r\n八、其他\r\n① mysql触发器不能对同一张表进行修改操作\r\n假如我在 before update 的时候作一条更新语句，随便将里面哪个字段进行更新\r\n\r\ndelimiter //\r\ncreate trigger up before update on orders for each row\r\nbegin\r\n    update orders set goods_id = 10 where id = new.id;\r\nend;\r\n//\r\ndelimiter ;\r\n1\r\n2\r\n3\r\n4\r\n5\r\n6\r\n7\r\n触发器创建成功\r\n\r\n接下来我用 update 语句对 orders 表进行更新\r\n\r\n此时报错了，提示不能进行更新。之后，我又尝试在触发器中进行 insert 和 delete 操作，之后更新的时候还是报同样的错误\r\n\r\n因此说明：MySQL 的触发器中不能对本表进行 insert、update 和 delete 操作，否则会报错\r\n\r\n\r\n九、优缺点\r\n优点\r\n触发器可以通过数据库中的关联表实现级联更改，即一张表数据的改变会影响其他表的数据\r\n可以保证数据安全，并进行安全校验\r\n缺点\r\n过分依赖触发器，影响数据库的结构，增加数据库的维护成本\r\n\r\n十、参考\r\nhttps://blog.csdn.net/chl191623691/article/details/79607761\r\nhttps://blog.csdn.net/qq_35246620/article/details/78946070\r\nhttps://www.cnblogs.com/phpper/p/7587031.html'),
(7,'GitHub是一个很方便的管理代码版本的工具。尤其是在你需要与其他人合作编程或者是使用不同电脑进行编程的时候，使用GitHub会比较方便。下面来记录一下如何将Pycharm中的项目同步到GitHub中。\r\n\r\n首先在Pycharm中创建一个项目，当然可以是任意一个你想要上传到GitHub上的项目。这里使用的示例项目叫做GitTest4\r\n\r\n\r\n\r\n依次点击File-->Settings --> Version Control --> Github。然后填写你的GitHub用户名和密码，点击Apply提交信息。这样Pycharm就和你的GitHub账号绑定了。下面这个图是设置成果之后的样子。\r\n\r\n\r\n\r\n绑定账号之后暂时还不能进行代码同步。需要安装 Git bash，可以自行搜索安装。安装成功之后，在刚刚的Version Control-->Git里面设置你刚刚安装成功Git bash的安装目录，选择bin目录下的git.exe文件。设置成功之后，点击右边的Test按钮，如果设置成功的话会弹出一个显示git版本的信息。\r\n\r\n\r\n\r\n至此所有的环境就设置完成了，下面介绍如何把这个项目上传到GitHub。依次点击上面菜单栏中的VCS-->Import into Version Control --> Share Project on Github\r\n\r\n\r\n\r\n在弹出的对话框中填写相关的信息，点击Share按钮\r\n\r\n\r\n\r\n然后会弹出一个新的对话框，会让选择要上传的文件以及填写提交信息等。当然一般情况下都是按照默认的就可以了。设置完成后，点击Add按钮\r\n\r\n\r\n\r\n稍等几秒钟，等Pycharm的右下方弹出一个显示已经成功分享到GitHub的小弹窗，说明已经分享成功了。\r\n\r\n\r\n\r\n这时候在网页上登录你的GitHub账号就会发现已经有这个项目了。\r\n\r\n\r\n\r\n\r\n\r\n至此，就介绍完了如何在PyCharm中将一个项目分享到GitHub中。下面简单介绍一下在Pycharm中如何进行push\r\n\r\n\r\n\r\n如上图，我在刚刚使用的这个项目中新建了一个HelloGit.py的Python文件，现在要做的就是把这个更改同步到GitHub中。首先点击VCS-->Commit，将更改进行提交，这样应该是把代码的更改提交到了一个本地的库中去。\r\n\r\n\r\n\r\n这里同样也是需要选择文件、填写提交信息，设置完成后点击Commit按钮进行提交。\r\n\r\n\r\n\r\n提交成功之后依次选择 VCS --> Git --> Push\r\n\r\n\r\n\r\n在弹出的窗口中点击Push按钮\r\n\r\n\r\n\r\n等待提交完成之后就可以在网页版中看到刚刚提交的信息了。\r\n\r\n\r\n\r\n至于其他的pull之类的操作与之类似，这里不再一一赘述。\r\n\r\n如有不当之处，欢迎通过QQ进行深入交流，同时也欢迎通过微信打赏的方式对博主进行支持。'),
(8,'最新线上出现一个bug，原因是客户输入了特殊汉字导致的\r\n\r\n福永街道文大厦2座6B\r\n如果不做任何处理，项目会抛异常，如下： \r\n\r\n如果抛这个异常：我们可以将字段的类型修改为“text”，接下来，运行，发现还是有问题：\r\n\r\n\r\n这是，我们只需要将字段的字符格式修改为：utf8mb4 问题就解决了。emoji表情图同理\r\n\r\n'),
(36,'来自开发者的测试内容///testing'),
(37,'// 必须是在用户已经授权的情况下调用\nwx.getUserInfo({\n  success: function(res) {\n    var userInfo = res.userInfo\n    var nickName = userInfo.nickName\n    var avatarUrl = userInfo.avatarUrl\n    var gender = userInfo.gender //性别 0：未知、1：男、2：女\n    var province = userInfo.province\n    var city = userInfo.city\n    var country = userInfo.country\n  }\n})'),
(38,'// 必须是在用户已经授权的情况下调用\nwx.getUserInfo({\n  success: function(res) {\n    var userInfo = res.userInfo\n    var nickName = userInfo.nickName\n    var avatarUrl = userInfo.avatarUrl\n    var gender = userInfo.gender //性别 0：未知、1：男、2：女\n    var province = userInfo.province\n    var city = userInfo.city\n    var country = userInfo.country\n  }\n})'),
(39,'wx.getUserInfo({\n  success: function(res) {\n    var userInfo = res.userInfo\n    var nickName = userInfo.nickName\n    var avatarUrl = userInfo.avatarUrl\n    var gender = userInfo.gender //性别 0：未知、1：男、2：女\n    var province = userInfo.province\n    var city = userInfo.city\n    var country = userInfo.country\n  }\n})'),
(40,'1.去http://dev.mysql.com/downloads/repo/apt/.下载一个mysql-apt-config_0.*.****_all.deb，使用\n\nsudo dpkg -i mysql-apt-config_0.*.****_all.deb\n\n安装执行，选择MySQL8.0，OK。\n\n然后apt update一下\n\n\n\n\n使用sudo apt install mysql-server命令，就会安装MySQL8.0\n\n\n\n\n\n按此方法会在安装过程中出现如下界面要求用户输入MySQL密码\n\n\n\nMySQL8.0采用了新的加密方式，一定要注意，正是因为这个加密方式才导致Ubuntu18.04用设置的root密码登录不了MySQL，因为Ubuntu18.04的终端可能有问题，并不支持这个新的加密方式。幸好有界面可以让我们选择使用旧版本5.x的加密方式，所以果断选择采用5.x的加密方式。\n\n\n\n最后在终端输入mysql -u root -p命令并输入密码检查安装成功而且可以看到MySQL版本号为8.0！！\n\n'),
(41,'文章发布测试');

/*Table structure for table `artic_info_active` */

DROP TABLE IF EXISTS `artic_info_active`;

CREATE TABLE `artic_info_active` (
  `like_sum` bigint unsigned DEFAULT '0' COMMENT '点赞数',
  `comments_num` bigint unsigned DEFAULT '0' COMMENT '评论数',
  `artic_key` bigint unsigned NOT NULL COMMENT '文章索引',
  PRIMARY KEY (`artic_key`),
  CONSTRAINT `artic_key` FOREIGN KEY (`artic_key`) REFERENCES `article` (`artic_key`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `artic_info_active` */

insert  into `artic_info_active`(`like_sum`,`comments_num`,`artic_key`) values 
(560,0,1),
(78,3,2),
(53,3,3),
(6,0,4),
(0,1,7),
(0,0,8),
(0,0,36),
(0,0,37),
(0,0,38),
(0,0,39),
(0,0,40),
(0,0,41);

/*Table structure for table `article` */

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `author` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'UniversaryUnion' COMMENT '文章作者',
  `submit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '文章发布时间',
  `artic_key` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '文章序列索引号',
  `artic_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'null' COMMENT '文章标题',
  `artic_summary` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '文章描述',
  `cover_img_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`artic_key`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `article` */

insert  into `article`(`author`,`submit_time`,`artic_key`,`artic_title`,`artic_summary`,`cover_img_url`) values 
('UniversaryUnion(LESs_cola)','2020-10-21 13:56:54',1,'基于阿里云 Ubuntu 16.04.3 LTS 搭建起来 python+flask web 服务器','六王毕，四海一；蜀山兀，阿房出。覆压三百余里，隔离天日。骊山北构而西折，直走咸阳。二川溶溶，流入宫墙。五步一楼，十步一阁；廊腰缦回，檐牙高啄；各抱地势，钩心斗角。盘盘焉，囷囷焉，蜂房',NULL),
('UniversaryUnion','2020-10-21 20:24:26',2,'Flask框架 之request对象','@app.route(\"/login\", methods=[\"GET\", \"POST\"])\r\n',NULL),
('CSDN作者','2020-10-22 10:56:48',3,'小程序的垂直水平居中','问题描述\r\n要实现水平/垂直居中，css设置','https://img-blog.csdnimg.cn/20190602164019692.png'),
('EclipseO2','2020-10-23 13:45:42',4,'MySQL | 触发器','一、基本概念\r\n触发器是一种特殊类型的存储过程，它不同于存储过程，主要是通过事件触发而被执行的，即不是主动调用而执行的；而存储过程则需要主动调用其名字执行','https://img-blog.csdn.net/2018092015581751?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2JhYnljYW41/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70'),
('UniversaryUnion','2020-10-23 15:59:48',7,'使用Pycharm将代码同步到GitHub','GitHub是一个很方便的管理代码版本的工具。尤其是在你需要与其他人合作编程或者是使用不同电脑进行编程的时候，使用GitHub会比较方便。下面来记录一下如何将Pycharm中的项目同步到GitHub中。','https://img-blog.csdnimg.cn/20190704213333891.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2pvaG5fYmlhbg==,size_16,color_FFFFFF,t_70'),
('UniversaryUnion','2020-10-23 16:00:50',8,'MySQL 存储特殊字符处理','最新线上出现一个bug，原因是客户输入了特殊汉字导致的',NULL),
('Author_Testor','2020-10-26 09:27:33',36,'[测试]来自开发者的测试内容','来自开发者的测试内容',NULL),
('Cola','2020-10-26 12:57:29',37,'','// 必须是在用户已经授权的情况下调用\nwx.getUserInfo({\n  success: function(res) {\n    var userInfo = res.userInfo\n    var nickName = userInfo.nickName\n    var avatarUrl = userInfo.avatarUrl\n    var gender = userInfo.gender //性别 0：未知、1：男、2：女\n    var province = userInfo.province\n    var city = userInfo.city\n    var country = userInfo.country\n  }\n})','https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2927006101,2361258207&fm=26&gp=0.jpg'),
('Cola','2020-10-26 12:58:23',38,'wx.getUserInfo(Object object)','// 必须是在用户已经授权的情况下调用\nwx.getUserInfo({\n  success: function(res) {\n    var userInfo = res.userInfo\n    var nickName = userInfo.nickName\n    var avatarUrl = userInfo.avatarUrl\n    var gender = userInfo.gender //性别 0：未知、1：男、2：女\n    var province = userInfo.province\n    var city = userInfo.city\n    var country = userInfo.country\n  }\n})','https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2927006101,2361258207&fm=26&gp=0.jpg'),
('Cola','2020-10-26 12:59:52',39,'wx.getUserInfo(Object object)','wx.getUserInfo({\n  success: function(res) {\n    var userInfo = res.userInfo\n    var nickName = userInfo.nickName\n    var avatarUrl = userInfo.avatarUrl\n    var gender = userInfo.gender //性别 0：未知、1：男、2：女\n    var province = userInfo.province\n    var city = userInfo.city\n    var country = userInfo.country\n  }\n})','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603698217249&di=3f89c7583bbcf0d5604e77764eb83a7b&imgtype=0&src=http%3A%'),
('Cola','2020-10-26 13:02:18',40,'Ubuntu16.04安装MySQL8.0','1.去http://dev.mysql.com/downloads/repo/apt/.下载一个mysql-apt-config_0.*.****_all.deb，使用\n\nsudo dpkg -i mysql-apt-config_0.*.****_all.deb\n\n安装执行，选择MySQL8.0，OK。\n\n然后apt update一下\n\n\n\n\n使用sudo apt install mysql-server命令，就会安装MySQL8.0\n\n\n\n\n\n按此方法会在安装过程中出现如下界面要求用户输入MySQL密码\n\n\n\nMySQL8.0采用了新的加密方式，一定要注意，正是因为这个加密方式才导致Ubuntu18.04用设置的root密码登录不了MySQL，因为Ubuntu18.04的终端可能有问题，并不支持这个新的加密方式。幸好有界面可以让我们选择使用旧版本5.x的加密方式，所以果断选择采用5.x的加密方式。\n\n\n\n最后在终端输入mysql -u root -p命令并输入密码检查安装成功而且可以看到MySQL版本号为8.0！！\n\n',NULL),
('Cola','2020-10-26 13:09:09',41,'文章发布测试','文章发布测试','undefined');

/*Table structure for table `comments` */

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `user_img_url` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1741476901,4013212021&fm=11&gp=0.jpg' COMMENT '用户头像地址',
  `artic_key` bigint unsigned NOT NULL DEFAULT '0' COMMENT '文章索引',
  `comments_key` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '评论索引',
  `author_id` text NOT NULL COMMENT '评论者ID',
  `comment_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '评论内容',
  `like_num` bigint DEFAULT '0' COMMENT '点赞数',
  `communicate_key` bigint unsigned DEFAULT NULL COMMENT '该评论下互动索引',
  `comm_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comments_key`),
  KEY `artic_to_comm` (`artic_key`),
  CONSTRAINT `artic_to_comm` FOREIGN KEY (`artic_key`) REFERENCES `article` (`artic_key`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `comments` */

insert  into `comments`(`user_img_url`,`artic_key`,`comments_key`,`author_id`,`comment_text`,`like_num`,`communicate_key`,`comm_time`) values 
('https://thirdwx.qlogo.cn/mmopen/vi_32/ZFUicG8wzsaEzLbrgOavhZWMA05qYiatgv4jogdbe4UswuhH8IwQ1ZDC6zDibO1f9BiaRmuAfrUWtskoCytva7yetw/132',2,54,'Cola','｡◕‿◕｡ヾ(❀╹◡╹)ﾉ~?????',0,NULL,'2020-10-23 14:53:53'),
('https://thirdwx.qlogo.cn/mmopen/vi_32/ZFUicG8wzsaEzLbrgOavhZWMA05qYiatgv4jogdbe4UswuhH8IwQ1ZDC6zDibO1f9BiaRmuAfrUWtskoCytva7yetw/132',2,55,'Cola','test',0,NULL,'2020-10-23 14:54:02'),
('https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1741476901,4013212021&fm=11&gp=0.jpg',2,56,'　\'⃢  \'　','sdd',0,NULL,'2020-10-23 15:16:47'),
('https://thirdwx.qlogo.cn/mmopen/vi_32/QqR0w8ISnK6N2r6lMUYDqs1jQgYvSzH1xN6CbKTUxe7iag2PTST05ebrLGvZBric1GpGqTuiaoQoSQLHhmuUNwEnw/132',3,57,'LeegelHigh','来啦来啦',0,NULL,'2020-10-23 15:54:55'),
('https://thirdwx.qlogo.cn/mmopen/vi_32/ZFUicG8wzsaEzLbrgOavhZWMA05qYiatgv4jogdbe4UswuhH8IwQ1ZDC6zDibO1f9BiaRmuAfrUWtskoCytva7yetw/132',3,58,'Cola','你别搞',0,NULL,'2020-10-23 17:22:01'),
('https://thirdwx.qlogo.cn/mmopen/vi_32/ZFUicG8wzsaEzLbrgOavhZWMA05qYiatgv4jogdbe4UswuhH8IwQ1ZDC6zDibO1f9BiaRmuAfrUWtskoCytva7yetw/132',7,59,'Cola','哦豁',0,NULL,'2020-10-26 13:05:52'),
('https://thirdwx.qlogo.cn/mmopen/vi_32/ZFUicG8wzsaEzLbrgOavhZWMA05qYiatgv4jogdbe4UswuhH8IwQ1ZDC6zDibO1f9BiaRmuAfrUWtskoCytva7yetw/132',3,60,'Cola','哈哈哈哈哈哈',0,NULL,'2020-10-26 13:08:25');

/* Trigger structure for table `article` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `after_insert_article` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `after_insert_article` AFTER INSERT ON `article` FOR EACH ROW BEGIN
    -- new 代表 orders 表中新增的数据
    INSERT INTO artic_info_active(like_sum,comments_num,artic_key) 
    VALUE(0,0,new.artic_key);
    INSERT INTO artic_content(artic_key,content) 
    VALUE(new.artic_key,null);
END */$$


DELIMITER ;

/* Trigger structure for table `comments` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `after_insert_comments` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `after_insert_comments` AFTER INSERT ON `comments` FOR EACH ROW BEGIN
    -- new 代表 orders 表中新增的数据
    UPDATE artic_info_active SET comments_num=comments_num+1 WHERE artic_key=new.artic_key;
END */$$


DELIMITER ;

/* Trigger structure for table `comments` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `after_delete_comments` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `after_delete_comments` AFTER DELETE ON `comments` FOR EACH ROW BEGIN
    -- new 代表 orders 表中新增的数据
    IF (SELECT comments_num FROM artic_info_active WHERE artic_key=old.artic_key)>0 THEN
	-- 中断操作：暴力解决，主动出错
	UPDATE artic_info_active SET comments_num=comments_num-1 WHERE artic_key=old.artic_key;
    END IF;
END */$$


DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
