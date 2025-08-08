"use client";
import { useEffect, useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/students")
      .then((res) => res.json())
      .then(setStudents);
  }, []);

  const addStudent = async () => {
    if (!name.trim() || !email.trim()) return;
    await fetch("http://localhost:8080/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    setName("");
    setEmail("");
    const res = await fetch("http://localhost:8080/students");
    setStudents(await res.json());
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, marginBottom: 24, color: "#333" }}>
        Students
      </h1>
      
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 4,
              border: "1px solid #ddd",
              fontSize: 16,
            }}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 4,
              border: "1px solid #ddd",
              fontSize: 16,
            }}
          />
        </div>
        <button
          onClick={addStudent}
          style={{
            padding: "10px 20px",
            borderRadius: 4,
            border: "none",
            background: "#007bff",
            color: "white",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Add Student
        </button>
      </div>

      <div>
        <h2 style={{ fontSize: 24, marginBottom: 16, color: "#333" }}>
          Student List
        </h2>
        {students.length === 0 ? (
          <p style={{ color: "#666", fontStyle: "italic" }}>
            No students yet. Add a student above.
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {students.map((student, index) => (
              <li
                key={index}
                style={{
                  padding: 16,
                  border: "1px solid #eee",
                  borderRadius: 4,
                  marginBottom: 8,
                  background: "#f9f9f9",
                }}
              >
                <div style={{ fontWeight: "bold", color: "#333" }}>
                  {student.name}
                </div>
                <div style={{ color: "#666", fontSize: 14 }}>
                  {student.email}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 