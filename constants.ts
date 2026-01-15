
import { AreaStatus, Room, StudyGroup, EventInfo } from './types';

export const AREAS: AreaStatus[] = [
  { id: '1', name: 'オープンスペース', level: '空き', occupancy: 20 },
  { id: '2', name: '集中エリア', level: 'やや混雑', occupancy: 45 },
  { id: '3', name: 'プレゼンテーションエリア', level: '混雑', occupancy: 75 },
  { id: '4', name: '個室ブース', level: '満席', occupancy: 100 },
];

export const ROOMS: Room[] = [
  { id: 'A', name: 'グループ学習室A', capacity: 6 },
  { id: 'B', name: 'グループ学習室B', capacity: 6 },
  { id: 'C', name: '多目的ルーム', capacity: 12 },
];

export const INITIAL_STUDY_GROUPS: StudyGroup[] = [
  {
    id: 'm1',
    theme: 'プログラミング演習II 課題協力',
    date: '2024-05-20',
    startTime: '13:00',
    endTime: '15:00',
    location: 'オープンスペース',
    organizer: '山田 太郎',
    currentMembers: 3,
    maxMembers: 5,
    description: 'ポインタの概念が難しいため、一緒に勉強してくれる人を募集します。',
    status: 'recruiting'
  },
  {
    id: 'm2',
    theme: 'TOEIC対策 模擬試験',
    date: '2024-05-21',
    startTime: '10:00',
    endTime: '12:00',
    location: '集中エリア',
    organizer: '佐藤 花子',
    currentMembers: 2,
    maxMembers: 4,
    description: '模試を解いた後に間違い直しを共有しましょう。',
    status: 'recruiting'
  }
];

export const INITIAL_EVENTS: EventInfo[] = [
  {
    id: 'e1',
    title: 'キャリアデザイン・ワークショップ',
    date: '2024-05-25 15:00',
    location: 'プレゼンテーションエリア',
    target: '全学年',
    content: '卒業生を招いてのキャリアパス相談会です。',
    likes: 12
  }
];
