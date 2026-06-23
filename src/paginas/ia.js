import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuid } from "uuid";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const genAI = new GoogleGenerativeAI(
  process.env.REACT_APP_GEMINI_API_KEY
);

const TarefasIa = () => {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);

  const { tasks, setTasks, showAlert } = useGlobalContext();
  const navigate = useNavigate();
  const generateTasks = async (e) => {
    e.preventDefault();

    if (!goal.trim()) return;

    try {
      setLoading(true);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const prompt = `
Crie uma lista de tarefas para atingir a seguinte meta:

"${goal}"

Retorne APENAS um JSON válido neste formato:

[
  {
    "name": "Nome da tarefa",
    "deadline": "data de quando precisa ser completada"
    "priority": "Alta"
  }
]

Prioridades:
- Alta
- Média
- Baixa
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      const json = JSON.parse(
        text.replace(/```json/g, "").replace(/```/g, "")
      );

      const formattedTasks = json.map((task) => ({
        id: uuid().slice(0, 8),
        name: task.name,
        completed: false,
        color: "#009688",
        deadline: task.deadline,
        priority:
          task.priority === "Alta"
            ? "red"
            : task.priority === "Média"
            ? "yellow"
            : "green",
      }));

      setTasks([...tasks, ...formattedTasks]);

      showAlert(true, "Tarefas geradas pela IA!");
      setGoal("");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar tarefas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <form className="head" onSubmit={generateTasks}>
          <input
            type="text"
            placeholder="Descreva sua meta..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            <p>{loading ? "Gerando..." : "Gerar"}</p>
          </button>
        </form>
      </div>

      <div className="footer">
        <a
          href="https://github.com/anna-hub19"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="github" />
        </a>
      </div>
    </>
  );
};

export default TarefasIa;