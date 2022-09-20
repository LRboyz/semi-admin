import { UserDataType } from '@/context/types';
import http from '@/utils/http';

export async function getUserInfo() {
  return http.get<UserDataType>('/auth/v1/user', {
    headers: {
      apikey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcmFvYnlhc3h3b2JtdXZtZGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjEzMDE1NTMsImV4cCI6MTk3Njg3NzU1M30.7zaADhGycdjFnxfDeXZN-6f_vUr3bGEPlzgGZCzNse0',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjYzNTE2MDkyLCJzdWIiOiI5Y2Y4NDViZi03Y2E2LTRjNGMtYjgyZS0yODQ2M2Q1ODgzYjUiLCJlbWFpbCI6IjYwMzU1MjkxNkBxcS5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImF2YXRhciI6Imh0dHBzOi8vdWNyYW9ieWFzeHdvYm11dm1kY3kuc3VwYWJhc2UuY28vc3RvcmFnZS92MS9vYmplY3QvcHVibGljL2Jsb2cvYXZhdGFycy9hdmF0YXIucG5nIiwibmFtZSI6IkxSYm95In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwic2Vzc2lvbl9pZCI6IjA3ZWYzNTdhLTI0MTEtNDJmMS1iMGE0LTM1ZWM5YzkwN2NlZiJ9.wiJHsOV_KTpib-Rt_q1Gw8McppFzcHRTDIOGTv4CQ-E',
    },
  });
}
