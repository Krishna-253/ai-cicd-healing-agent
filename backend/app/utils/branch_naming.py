import re

def generate_branch_name(team_name: str, leader_name: str) -> str:
    """
    Generates branch name in exact required format:
    TEAM_NAME_LEADER_NAME_AI_Fix
    """

    def clean(text):
        text = text.upper()
        text = re.sub(r'[^A-Z0-9 ]', '', text)
        text = text.replace(" ", "_")
        return text

    team_clean = clean(team_name)
    leader_clean = clean(leader_name)

    return f"{team_clean}_{leader_clean}_AI_Fix"