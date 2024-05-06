import IMealPlan from '@/interfaces/flight/mealPlan.interface'
import axiosClient from './api/axios.service'

class MealPlanService {
  async getMealPlans() {
    const response = await axiosClient.get('/meal-plans', {})
    const data = response.data.data
    return data
  }
  async updateMealPlan(mealPlanId: string, mealPlan: IMealPlan) {
    const response = await axiosClient.patch(`/meal-plans/${mealPlanId}`, mealPlan)
    const data = response.data.data
    return data
  }
}

export default new MealPlanService()
