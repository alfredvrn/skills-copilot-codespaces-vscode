function skillsMember() {
    var member = document.getElementById("member");
    var memberSkills = document.getElementById("memberSkills");
    var memberSkillsBtn = document.getElementById("memberSkillsBtn");
    var memberSkillsBtnIcon = document.getElementById("memberSkillsBtnIcon");
    if (memberSkills.style.display === "none") {
        memberSkills.style.display = "block";
        memberSkillsBtnIcon.style.transform = "rotate(180deg)";
        member.style.height = "auto";
    } else {
        memberSkills.style.display = "none";
        memberSkillsBtnIcon.style.transform = "rotate(0deg)";
        member.style.height = "auto";
    }
}
