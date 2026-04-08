AI Triage System for Emergency Departments
Overview

Emergency departments often face overcrowding, limited doctors, and critical delays in patient care. This project simulates a real-time triage system where an intelligent agent decides which patient to treat under resource constraints.

The goal is to model decision-making in high-pressure environments and optimize outcomes by prioritizing patients based on severity and waiting time.

 Key Features
 Interactive environment (reset, step, state)
 Real-world trade-offs (severity vs waiting time)
 Reward-based decision system
 Multiple difficulty levels (Easy, Medium, Hard)
 Performance grading (0.0 → 1.0)
 Baseline agent for automated evaluation
 Environment Design
State
{
  "patients": [
    {"severity": 8, "wait": 5}
  ],
  "available_doctors": 2
}
Actions
treat_highest_severity
treat_longest_waiting
treat_random
do_nothing
 Reward Logic
 Treat critical patients → Positive reward
 Delay high-severity cases → Penalty
 Idle resources → Penalty
 Tasks
 Easy → Low patient load
 Medium → Mixed conditions
 Hard → Overcrowded emergency
 API Endpoints
Method	Endpoint	Description
POST	/reset	Initialize environment
GET	/state	Get current state
POST	/step	Take an action
GET	/tasks	List available tasks
GET	/grader	Get performance score
GET	/baseline	Run baseline agent

Example Request
POST /step
{
  "action": "treat_highest_severity"
}
Run Locally (Docker)
docker build -t triage-app .
docker run -p 7860:7860 triage-app
 Deployment

Deployed using Docker (e.g., Hugging Face Spaces).

🏁 Conclusion

This project demonstrates how AI-driven environments can support critical decision-making in healthcare, helping improve efficiency and patient outcomes in emergency departments.
