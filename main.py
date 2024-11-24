import tornado.ioloop
import tornado.web
import os;

class DefaultHandler(tornado.web.RequestHandler):
    def get(self):
        self.redirect("/main.html")
class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("main.html")

class GameHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("game.html")

def make_app():
    settings = {
        "static_path": os.path.join(os.path.dirname(__file__), "."),
    }
    return tornado.web.Application([
        (r"/", DefaultHandler),
        (r"/(.*)", tornado.web.StaticFileHandler, {"path": settings['static_path']})
    ], **settings)

if __name__ == "__main__":
    app = make_app()
    app.listen(19719)
    print("服务器启动在 http://localhost:19719/")
    tornado.ioloop.IOLoop.current().start()


