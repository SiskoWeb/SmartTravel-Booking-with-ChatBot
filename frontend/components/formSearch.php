<form class="bg-white rounded-lg  p-6 w-full">
    <div class="grid grid-cols-2 gap-6">
        <div class="col-span-2 sm:col-span-1 ">
            <select id="departure" class="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500 ">
                <option class="text-gray-400" value="" disabled selected>Pick departure</option>

            </select>
        </div>
        <div class="col-span-2 sm:col-span-1 ">
            <select id="destination" class="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500">
                <option class="text-gray-400 " value="" disabled selected>Pick destination</option>

            </select>
        </div>
        <div class="col-span-2 sm:col-span-1 ">
            <input type="date" name="date" id="date" class="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500" />
        </div>
        <div class="col-span-2 sm:col-span-1 ">
            <select id="person" class="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500">
                <option selected>Choose a gost</option>
                <option value="US">1</option>s
                <option value="CA">2</option>
                <option value="FR">3</option>
                <option value="DE">4</option>
            </select>
        </div>
    </div>

    <div class="mt-4 flex justify-center">
        <button type="button" id="findTripBtn" class="w-[150px] bg-green-700 hover:bg-green-600 text-white font-medium py-1 rounded-lg focus:outline-none">Find Tickets</button>
    </div>
</form>



<script>
    getCurrentDateTime()
//this funcyion for limit user date he can't choose yesterday

    function getCurrentDateTime() {
        const departure = document.getElementById('date')
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');


        departure.min = `${year}-${month}-${day}`
        // return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
</script>