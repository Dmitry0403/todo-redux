import { createServer, Model } from "miragejs";

createServer({
  models: {
    todos: Model,
  },

  seeds(server) {
    server.create("todo", { title: "Learn JS", isDone: false });
    server.create("todo", { title: "Learn React", isDone: false });
    server.create("todo", { title: "Learn Redux", isDone: false });
  },

  routes() {
    this.namespace = "api";

    this.get("/todos", (schema) => schema.todos.all());

    this.post("/todos", (schema, request) => {
      const { requestBody: title } = request;

      return schema.todos.create({ title, isDone: false });
    });

    this.patch("/todos/:id", (schema, request) => {
      const newAttrs = JSON.parse(request.requestBody);
      const id = request.params.id;
      const todo = schema.todos.find(id);

      return todo.update(newAttrs);
    });

    this.del("/todos/:id", (schema, request) => {
      const id = request.params.id;
      schema.todos.find(id).destroy();
    });
  },
});
