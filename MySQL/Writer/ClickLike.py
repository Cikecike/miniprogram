# -*-coding:utf-8-*-
"""
@author_    :   HP
@date       :   2020/10/21 19:31
@email      :   tsz1216@sina.com
@software   :   PyCharm
"""

import pymysql
import json
from Decorator.Loger import log


@log
def click_Article_Like(conn=None,artic_keys=None,userid=None):
    """
    :description:Clicked like of article 暂时不识别用户，单一用户可以无限制点赞
    :param conn:Mysql Connection of DataBase
    :return: Article:[
      {
        'Artic_key':"7788",
        'Artic_Title':"[本地测试内容]基于阿里云 Ubuntu 16.04.3 LTS 搭建 python+flask web 服务器",
        'Artic_summary':"[本地测试内容]1. 确认 Ubuntu 已正确安装 python 及 pip请参考《Linux Ubuntu 系统，python、pip 及virtualenv 安装》2. 通过 FileZilla 将 python+flask 工程部署于 Ubuntu 服务器3. 将工程中的启动文件 Application.py 中的 host 设置为 0.0.0.0",
      },
      ......
    ],
    """
    selfBulidLink=False
    # 打开数据库连接
    if conn==None:
        conn = pymysql.connect(host='localhost', user='root', passwd='root', db='miniprogram',cursorclass = pymysql.cursors.DictCursor)
        selfBulidLink=True
    # 使用cursor()方法创建一个游标对象cursor
    cursor = conn.cursor()  # 游标对象用于执行查询和获取结果
    # 使用execute()方法执行SQL查询
    cursor.execute("UPDATE artic_info_active SET like_sum=like_sum+1 WHERE artic_key=%d;"%(artic_keys))
    # 使用fetchone()方法获取单条数据
    conn.commit()

    # 关闭数据库连接
    # [print(i)for i in l]
    if selfBulidLink:
        conn.close()

# click_Article_Like(artic_keys=1)


