import { connectDB } from '@/lib/db'
import { Mealfood } from '@/Model/foodModel';
export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();

        const newMeal = new Mealfood({
            author: body.name,
            email: body.email,
            title: body.title,
            shortSummary: body.summary,
            instruction: body.instructions,
            image:body.image
        })

        await newMeal.save();

        return new Response(JSON.stringify({ sucess: true }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error('❌ Error in POST:', error);
        return new Response(JSON.stringify({ error: 'Failed to create meal ❌' }), {
            status: 500,
        });
    }

}

export async function GET() {
    try {
      await connectDB();
      const meals = await Mealfood.find().sort({ createdAt: -1 }); 
      return new Response(JSON.stringify(meals), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Error fetching meals" }), {
        status: 500,
      });
    }
  }