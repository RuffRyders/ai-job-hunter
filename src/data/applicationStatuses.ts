interface ApplicationStatusData {
  name: string;
  value: string;
  color: string;
}

export const applicationStatuses = {
  ["not-yet-applied"]: {
    name: "Not Yet Applied",
    value: "not-yet-applied",
    color: "#b3b3b3",
  },
  applied: { name: "Applied", value: "applied", color: "#00A8DD" },
  interviewing: {
    name: "Interviewing",
    value: "interviewing",
    color: "#FFA800",
  },
  rejected: { name: "Rejected", value: "rejected", color: "#F04C4C" },
  offered: { name: "Offered", value: "offered", color: "#3CC925" },
} as {
  ["not-yet-applied"]: ApplicationStatusData;
  applied: ApplicationStatusData;
  interviewing: ApplicationStatusData;
  offered: ApplicationStatusData;
  rejected: ApplicationStatusData;
  [key: string]: ApplicationStatusData;
};
