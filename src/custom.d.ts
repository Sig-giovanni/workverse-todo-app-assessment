type User = {
  name: string;
  avatar: string;
};

type Users = {
  [key: string]: User;
};

interface Task {
  id: string;
  text: string;
  done: boolean;
  actionParty: User;
}

interface Member {
  id: string;
  info: User;
}

interface Members {
  count: number;
  me: {
    id: string;
    user_info: User;
  };
  members: Users;
  each(callback: (member: Member) => void): void;
  get(userId: string): Member | null;
}
