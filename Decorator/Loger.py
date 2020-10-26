# -*-coding:utf-8-*-
"""
@author_    :   HP
@date       :   2020/10/23 9:19
@email      :   tsz1216@sina.com
@software   :   PyCharm
"""
import functools


def log(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print("\033[1;34mCall %s():"% func.__name__,end="")
        try:
            print("\033[1;34margs = {}".format(args))
        except Exception as e:
            print(e)
            print("\033[1;34mwithout args")
        return func(*args, **kwargs)
    return wrapper