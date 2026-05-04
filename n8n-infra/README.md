# <img width="30" alt="logo" src="https://github.com/user-attachments/assets/d1ffee27-8576-4b32-b7b3-0227dac29b43"> BASILIUM Infrastructure Automation

BASILIUM 서비스의 안정적인 배포 및 운영 환경 자동화를 위한 Docker 기반 인프라 구성 프로젝트입니다.

## 주요 기능

- **n8n Workflow Automation**: 워크플로우를 활용한 비즈니스 로직 자동화 및 외부 API 연동
- **Reverse Proxy (Nginx)**: 고정 도메인 연결 및 외부 트래픽 제어 (SSL 터미네이션 준비)
- **Persistent Storage (MySQL)**: n8n 메타데이터 및 주요 서비스 데이터의 영구 보존
- **Host Control (SSH)**: n8n을 통한 호스트 머신(macOS) 원격 제어 및 파일 시스템 관리

## 기술 스택

- **Core**: Docker, Docker Compose
- **Service**: n8n, Nginx, MySQL 8.0
- **OS Environment**: macOS (Apple Silicon 기반)
- **Auth**: SSH RSA Key, MySQL Credentials

## 디렉토리 구조

```bash
n8n-infra/
├── docker-compose.yml    # 서비스 오케스트레이션 설계도
├── .env                  # 로컬 환경 변수 (Git 추적 제외)
├── .env.example          # 환경 변수 샘플 가이드
├── .gitignore            # 민감 정보 및 데이터 폴더 제외 설정
├── mysql_data/           # (Auto-generated) MySQL 물리 데이터 저장소
└── n8n_data/             # (Auto-generated) n8n 설정 및 로컬 DB 저장소
```
