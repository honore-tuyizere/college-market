import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Container from "../common/Container";
import { queryKeys } from "../../utils/queryKeys";
import { getMySliders, updateSliderStatus } from "../../apis/slider";
import { ISlider } from "../../types";
import toast from "react-hot-toast";

export const MySliderList: React.FC = () => {
  const { isLoading, data: mySliders } = useQuery({
    queryFn: () => getMySliders(),
    queryKey: queryKeys.slidersInDashboard,
  });
  const queryClient = useQueryClient();
  const sliderMutation = useMutation({ mutationFn: updateSliderStatus });

  const handleSwitchChange = (sliderId: string) => {
    sliderMutation.mutate(
      { id: sliderId },
      {
        onSuccess() {
          queryClient.invalidateQueries({
            queryKey: queryKeys.slidersInDashboard,
          });
          toast.success("successful");
        },
      },
    );
  };

  return (
    <Container>
      {isLoading && <p className='p-12 text-center'>Loading...</p>}
      {mySliders && (
        <div>
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-5000'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
                <tr>
                  <th scope='col' className='px-16 py-3'>
                    <span className='sr-only'>Image</span>
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Title
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Description
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Type
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {mySliders.map((slider: ISlider) => (
                  <tr
                    className='bg-white border-b   hover:bg-gray-50 '
                    key={slider._id}
                  >
                    <td className='p-4'>
                      <img
                        src={slider.photo}
                        className='w-16 md:w-32 max-w-full max-h-full'
                        alt='Slider'
                      />
                    </td>
                    <td className='px-6 py-4 font-semibold text-gray-900'>
                      {slider.title}
                    </td>
                    <td className='px-6 py-4 font-semibold text-gray-900'>
                      {slider.description!.length > 100
                        ? `${slider.description!.slice(0, 100)}...`
                        : slider.description}
                    </td>
                    <td className='px-6 py-4 font-semibold text-gray-900'>
                      {slider.type}
                    </td>
                    <td className='px-6 py-4'>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={slider.sliderStatus === "ACTIVE"}
                          className='sr-only peer'
                          onChange={() => handleSwitchChange(slider._id!)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-700"></div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Container>
  );
};

export default MySliderList;
